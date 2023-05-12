const Joi = require("joi");

// eslint-disable-next-line no-useless-escape
const emailRegexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const registerSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
  subscription: Joi.string(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(6).required().messages({
    "string.empty": `"password" cannot be an empty field`,
    "string.min": `"password" should have a minimum length of {#limit}`,
    "any.required": `"password" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).required().messages({
    "string.empty": `"email" cannot be an empty field`,
    "any.required": `"email" is a required field`,
  }),
});

const schemas = {
  registerSchema,
  loginSchema,
};

module.exports = {
  schemas,
};
