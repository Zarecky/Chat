const Joi = require('@hapi/joi');

module.exports.registerValidation = (data) => {
  const schema = {
    name: Joi.string()
      .required(),
    pass: Joi.string()
      .required()
  };

  return Joi.validate(data, schema);
};

module.exports.loginValidation = (data) => {
  const schema = {
    name: Joi.string()
      .required(),
    pass: Joi.string()
      .required()
  };

  return Joi.validate(data, schema);
};