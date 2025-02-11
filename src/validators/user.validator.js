import Joi from '@hapi/joi';

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .min(4)
      .max(30)
      .regex(/^[a-zA-Z\s]+$/)
      .required()
      .messages({
        'string.empty': 'Name is required',
        'string.min': 'Name must be at least 4 characters',
        'string.max': 'Name cannot exceed 30 characters',
        'string.pattern.base': 'Name should only contain alphabets'
      }),
    phoneNumber: Joi.number().min(6000000000).max(9999999999).optional(),
    email: Joi.string()
      .email()
      .regex(/^[a-zA-Z0-9._%+-]+@gmail\.com$/)
      .required()
      .messages({
        'string.empty': 'Email is required',
        'string.email': 'Invalid email format',
        'string.pattern.base': 'Only Gmail accounts (@gmail.com) are allowed'
      }),
    password: Joi.string()
      .min(8)
      .max(15)
      .regex(/^(?=.*[!@#$%^&*])/)
      .required()
      .messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 8 characters',
        'string.max': 'Password cannot exceed 15 characters',
        'string.pattern.base': 'Password contain special character (!@#$%^&*)'
      })
  });
  const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
  } else {
    req.validatedBody = value;
    next();
  }
};
