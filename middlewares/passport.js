const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { User } = require("../models/userMongoose");

const { BASE_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, SECRET_KEY } =
  process.env;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${BASE_URL}/auth/google-redirect`,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        console.log("profile =>", profile);

        let user = await User.findOne({ email });
        let token = "";

        if (user) {
          const payload = {
            id: user._id,
          };

          token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

          await User.findByIdAndUpdate(user._id, {
            token,
            verificationToken: null,
            verify: true,
          });
        }

        if (!user) {
          const avatarURL =
            profile.photos && profile.photos.length > 0
              ? profile.photos[0].value
              : gravatar.url(email);

          const temporaryPassword = await bcrypt.genSalt(6);
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

        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

module.exports = passport;
