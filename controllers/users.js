const { ctrlWrapper } = require("../helpers");
const { User } = require("../models/userMongoose");

const register = async (req, res) => {
  const newUser = await User.create(req.body);

  res.json({
    email: newUser.email,
    subscription: newUser.subscription,
  });
};

module.exports = {
  register: ctrlWrapper(register),
};
