import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .trim()
    .nonempty('First name is required. Please insert first name')
    .max(20, 'First Name cannot be more than 20 characters')
    .refine(
      (value) => value.charAt(0).toUpperCase() + value.slice(1) === value,
      {
        message: '{VALUE} is not in capitalize format',
      },
    ),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty('Last name is required. Please insert last name')
    .refine((value) => /^[a-zA-Z]+$/.test(value), {
      message: '{VALUE} is not valid',
    }),
});

const guardianValidationSchema = z.object({
  fatherName: z
    .string()
    .nonempty("Father's name is required. Please insert father's name"),
  fatherOccupation: z
    .string()
    .nonempty(
      "Father's occupation is required. Please insert father's occupation",
    ),
  fatherContactNo: z
    .string()
    .nonempty(
      "Father's contact number is required. Please insert father's contact number",
    ),
  motherName: z
    .string()
    .nonempty("Mother's name is required. Please insert mother's name"),
  motherOccupation: z
    .string()
    .nonempty(
      "Mother's occupation is required. Please insert mother's occupation",
    ),
  motherContactNo: z
    .string()
    .nonempty(
      "Mother's contact number is required. Please insert mother's contact number",
    ),
});

const localGuardianValidationSchema = z.object({
  name: z
    .string()
    .nonempty(
      "Local guardian's name is required. Please insert local guardian's name",
    ),
  occupation: z
    .string()
    .nonempty(
      "Local guardian's occupation is required. Please insert local guardian's occupation",
    ),
  contactNo: z
    .string()
    .nonempty(
      "Local guardian's contact number is required. Please insert local guardian's contact number",
    ),
  address: z
    .string()
    .nonempty(
      "Local guardian's address is required. Please insert local guardian's address",
    ),
});

const studentValidationSchema = z.object({
  id: z.string().nonempty('Student ID is required. Please insert student ID'),
  password: z
    .string()
    .max(20)
    .nonempty('Password is required. Please insert password'),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string().optional(),
  email: z
    .string()
    .email('Email is not valid')
    .nonempty('Email is required. Please insert email'),
  contactNo: z
    .string()
    .nonempty('Contact number is required. Please insert contact number'),
  emergencyContactNo: z
    .string()
    .nonempty(
      'Emergency contact number is required. Please insert emergency contact number',
    ),
  bloodGroup: z
    .enum(['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'])
    .optional(),
  presentAddress: z
    .string()
    .nonempty('Present address is required. Please insert present address'),
  permanentAddress: z
    .string()
    .nonempty('Permanent address is required. Please insert permanent address'),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profileImg: z.string().optional(),
  isActive: z.enum(['active', 'inactive']).default('active'),
  isDeleted: z.boolean(),
});
export default studentValidationSchema;
