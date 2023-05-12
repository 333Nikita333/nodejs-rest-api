const jwt = require("jsonwebtoken");

const { HttpError } = require("../helpers");
const { User } = require("../models/userMongoose");

const { SECRET_KEY } = process.env;

const authenticate = async (req, _, next) => {
  const errorAuth = new HttpError(401, "Not authorized");

  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");

  if (bearer !== "Bearer") {
    next(errorAuth);
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(errorAuth);
    }

    req.user = user;
    next();
  } catch {
    next(errorAuth);
  }
};

module.exports = authenticate;
