const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");

const { SECRET_KEY } = process.env;
const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const { ctrlWrapper, HttpError } = require("../helpers");
const { User, subscriptionList } = require("../models/userMongoose");
const avatarManipulator = require("../helpers/avatarManipulator");

const register = async (req, res) => {
  const errorConflict = new HttpError(409, "Email in use");

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw errorConflict;
  }

  const hashPawword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const newUser = await User.create({
    ...req.body,
    password: hashPawword,
    avatarURL,
  });

  res.status(201).json({
    user: {
      email: newUser.email,
      subscription: newUser.subscription,
    },
  });
};

const login = async (req, res) => {
  const errorAuth = new HttpError(401, "Email or password is wrong");

  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw errorAuth;
  }

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw errorAuth;
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
  await User.findByIdAndUpdate(user._id, { token });

  res.json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, password } = req.user;

  res.json({ email, password });
};

const logout = async (req, res) => {
  const { _id: userId } = req.user;
  await User.findByIdAndUpdate(userId, { token: null });

  res.status(204);
};

const updateSubscription = async (req, res) => {
  const errorSubscription = new HttpError(400, "Invalid subscription value");
  const { subscription } = req.body;
  const { _id: userId } = req.user;

  if (!subscription || !subscriptionList.includes(subscription)) {
    throw errorSubscription;
  }

  const updatedUser = await User.findByIdAndUpdate(
    userId,
    { subscription },
    { new: true }
  );
  res.json({
    user: {
      email: updatedUser.email,
      subscription: updatedUser.subscription,
    },
  });
};

const updateAvatar = async (req, res) => {
  const { _id: userId } = req.user;
  const { path: tmpUpload, originalname } = req.file;

  const resultUpload = path.join(avatarsDir, originalname);
  await fs.rename(tmpUpload, resultUpload);

  await avatarManipulator(resultUpload);

  const newFileName = `${userId}_${originalname}`;
  const avatarURL = path.join("avatars", newFileName);

  await User.findByIdAndUpdate(userId, { avatarURL });

  res.json({ avatarURL });
};

module.exports = {
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
};
