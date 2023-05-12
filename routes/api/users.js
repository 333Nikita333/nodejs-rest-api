const express = require("express");
const router = express.Router();
const { validateBody } = require("../../middlewares");
const { schemas } = require("../../models/userJoi");
const ctrl = require("../../controllers/users");

router.post("/register", validateBody(schemas.registerSchema), ctrl.register);

module.exports = router;
