const Joi = require('@hapi/joi');

//Register Validation
const registerValidation = (data) => {
  const requirements = Joi.object({
    name: Joi.string().min(6).max(50).required(),
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required()
  });
  return requirements.validate(data);
};


const loginValidation = (data) => {
  const requirements = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    password: Joi.string().min(8).max(1024).required()
  });
  return requirements.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
