const express = require("express");
const { passport } = require("../../middlewares");

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google-redirect",
  passport.authenticate("google", {
    successRedirect: false,
    failureRedirect: false,
  }),
  (req, res) => {
    if (req.user) {
      res.json({ message: "Аутентификация через Google успешна." });
    } else {
      res
        .status(401)
        .json({ message: "Аутентификация через Google не удалась." });
    }
  }
);

module.exports = router;
