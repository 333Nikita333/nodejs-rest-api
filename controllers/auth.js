const gravatar = require("gravatar");
const bcrypt = require("bcrypt");
const { User } = require("../models/userMongoose");

const { SECRET_KEY } = process.env;

const handleGoogleAuth = async (_, _, profile, done) => {
  try {
    const email = profile.emails[0].value;
    console.log("email =>", email);

    let user = await User.findOne({ email });
    let token = "";

    if (user) {
      const payload = {
        id: user._id,
      };

      token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

      await User.findByIdAndUpdate(user._id, {
        token,
        verify: true,
        verificationToken: null,
      });
    }

    if (!user) {
      const avatarURL =
        profile.photos && profile.photos.length > 0
          ? profile.photos[0].value
          : gravatar.url(email);

      const temporaryPassword = await bcrypt.genSalt(10);
      const payload = {
        id: profile.id,
      };
      token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

      user = await User.create({
        password: temporaryPassword,
        email,
        avatarURL,
        token,
        verificationToken: null,
        verify: true,
      });
    }

    return done(null, {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    return done(error, null);
  }
};

module.exports = {
  handleGoogleAuth,
};
