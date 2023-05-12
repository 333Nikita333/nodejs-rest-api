const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required(),
  email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  schemas,
};
