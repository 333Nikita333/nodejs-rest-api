const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");
const { User } = require("../models/userMongoose");

const handleGoogleAuth = async (req, res) => {
  const { email } = req.user;

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError(401, "User not found");
  }

  if (user && !user.verify) {
    throw new HttpError(401, "This user exists, but it is not verified");
  }

  const passwordInfoEmail = {
    to: email,
    subject: "Password information",
    html: `<div>
            <p>When registering via Google authorization, the following temporary password was generated: <strong>${user.password}</strong></p>
            </br>
            <p>Please remember this password for future logins or change it to a different one in your account settings.</p>
          </div>`,
  };

  await sendEmail(passwordInfoEmail);

  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
};

module.exports = {
  handleGoogleAuth: ctrlWrapper(handleGoogleAuth),
};
