const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const phoneRegexp = /^\+\d{12}$/;

const userSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.empty": `"Name" cannot be an empty field`,
    "any.required": `"Name" is a required field`,
  }),
  email: Joi.string().pattern(emailRegexp).messages({
    "string.pattern.base": `"Email" is invalid`,
    "string.empty": `"Email" cannot be an empty field`,
  }),
  phone: Joi.string().pattern(phoneRegexp).required().messages({
    "string.pattern.base":
      'Phone number must start with "+" and contain 12 digits',
    "string.empty": `"Phone" cannot be an empty field`,
    "any.required": `"Phone" is a required field`,
  }),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  userSchema,
  updateFavoriteSchema,
};

module.exports = {
  schemas,
};
