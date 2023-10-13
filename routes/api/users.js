const express = require("express");

const ctrl = require("../../controllers/users");
const { validateBody, authenticate, upload } = require("../../middlewares");
const { schemas } = require("../../models/userJoi");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

router.get("/verify/:verificationToken", ctrl.verifyEmail);

router.post(
  "/verify",
  validateBody(schemas.verifyEmailSchema),
  ctrl.resendVerifyEmail
);

router.post("/login", validateBody(schemas.loginSchema), ctrl.login);

router.get("/current", authenticate, ctrl.getCurrent);

router.post("/logout", authenticate, ctrl.logout);

router.patch("/", authenticate, ctrl.updateSubscription);

//! If we expect several files in one field - upload.array("avatar", 8)
//! The first argument is the field name, the second - maximum number of files
//? If we expect files in multiple fields - upload.fields([{name: "avatar", maxCount: "1"}, {name: "secondAvatar", maxCount: 2}])
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  ctrl.updateAvatar
);

module.exports = router;
