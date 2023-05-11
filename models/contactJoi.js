const Joi = require("joi");

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
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
