import Joi from 'joi';

const userNameValidationSchema = Joi.object({
  firstName: Joi.string()
    .trim()
    .required()
    .max(20)
    .regex(/^[A-Z][a-z]*$/)
    .messages({
      'string.pattern.base':
        'First name must start with a capital letter and not exceed 20 characters',
      'string.max': 'First name must not exceed 20 characters',
      'any.required': 'First name is required',
    }),
  middleName: Joi.string().optional(),
  lastName: Joi.string()
    .required()
    .regex(/^[a-zA-Z]+$/)
    .messages({
      'string.pattern.base':
        'Last name must contain only alphabetic characters',
      'any.required': 'Last name is required',
    }),
});

const guardianValidationSchema = Joi.object({
  fatherName: Joi.string()
    .required()
    .messages({ 'any.required': "Father's name is required" }),
  fatherOccupation: Joi.string()
    .required()
    .messages({ 'any.required': "Father's occupation is required" }),
  fatherContactNo: Joi.string()
    .required()
    .messages({ 'any.required': "Father's contact number is required" }),
  motherName: Joi.string()
    .required()
    .messages({ 'any.required': "Mother's name is required" }),
  motherOccupation: Joi.string()
    .required()
    .messages({ 'any.required': "Mother's occupation is required" }),
  motherContactNo: Joi.string()
    .required()
    .messages({ 'any.required': "Mother's contact number is required" }),
});

const localGuardianValidationSchema = Joi.object({
  name: Joi.string()
    .required()
    .messages({ 'any.required': "Local guardian's name is required" }),
  occupation: Joi.string().required().messages({
    'any.required': "Local guardian's occupation is required",
  }),
  contactNo: Joi.string().required().messages({
    'any.required': "Local guardian's contact number is required",
  }),
  address: Joi.string()
    .required()
    .messages({ 'any.required': "Local guardian's address is required" }),
});

const studentValidationSchema = Joi.object({
  id: Joi.string()
    .required()
    .messages({ 'any.required': 'Student ID is required' }),
  name: userNameValidationSchema.required(),
  gender: Joi.string().valid('male', 'female', 'other').required().messages({
    'any.only': 'Gender must be one of the following: male, female, or other',
    'any.required': 'Gender is required',
  }),
  dateOfBirth: Joi.string().optional(),
  email: Joi.string().email().required().messages({
    'string.email': 'A valid email is required',
    'any.required': 'Email is required',
  }),
  contactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Contact number is required' }),
  emergencyContactNo: Joi.string()
    .required()
    .messages({ 'any.required': 'Emergency contact number is required' }),
  bloodGroup: Joi.string()
    .valid('A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-')
    .optional()
    .messages({ 'any.only': 'Invalid blood group' }),
  presentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Present address is required' }),
  permanentAddress: Joi.string()
    .required()
    .messages({ 'any.required': 'Permanent address is required' }),
  guardian: guardianValidationSchema.required(),
  localGuardian: localGuardianValidationSchema.required(),
  profileImg: Joi.string().optional(),
  isActive: Joi.string()
    .valid('active', 'inactive')
    .default('active')
    .messages({
      'any.only': "Status must be either 'active' or 'inactive'",
    }),
});

export default studentValidationSchema;
