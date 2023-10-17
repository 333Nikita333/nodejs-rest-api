const express = require("express");
const { passport } = require("../../middlewares");
const ctrl = require("../../controllers/auth");

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
  ctrl.handleGoogleAuth
);

module.exports = router;