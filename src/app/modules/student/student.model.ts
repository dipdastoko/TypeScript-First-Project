import { model, Schema } from 'mongoose';
import validator from 'validator';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  TStudentMethods,
  TStudentModel,
  TUserName,
} from './student.interface';
import isEmail from 'validator/lib/isEmail';

const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    trim: true,
    required: [true, 'First name is required. Please insert first name'],
    maxlength: [20, 'First Name can not be more than 20 characters'],
    validate: {
      validator: function (value: string) {
        const firstNameStr = value.charAt(0).toUpperCase() + value.slice(1);
        return firstNameStr === value;
      },
      message: '{VALUE} is not in capitalize format',
    },
  },
  middleName: { type: String },
  lastName: {
    type: String,
    required: [true, 'Last name is required. Please insert last name'],
    validate: {
      validator: (value: string) => validator.isAlpha(value),
      message: '{VALUE} is not valid',
    },
  },
});

const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: [true, "Father's name is required. Please insert father's name"],
  },
  fatherOccupation: {
    type: String,
    required: [
      true,
      "Father's occupation is required. Please insert father's occupation",
    ],
  },
  fatherContactNo: {
    type: String,
    required: [
      true,
      "Father's contact number is required. Please insert father's contact number",
    ],
  },

  motherName: {
    type: String,
    required: [true, "Mother's name is required. Please insert mother's name"],
  },
  motherOccupation: {
    type: String,
    required: [
      true,
      "Mother's occupation is required. Please insert mother's occupation",
    ],
  },
  motherContactNo: {
    type: String,
    required: [
      true,
      "Mother's contact number is required. Please insert mother's contact number",
    ],
  },
});

const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: [
      true,
      "Local guardian's name is required. Please insert local guardian's name",
    ],
  },
  occupation: {
    type: String,
    required: [
      true,
      "Local guardian's occupation is required. Please insert local guardian's occupation",
    ],
  },
  contactNo: {
    type: String,
    required: [
      true,
      "Local guardian's contact number is required. Please insert local guardian's contact number",
    ],
  },
  address: {
    type: String,
    required: [
      true,
      "Local guardian's address is required. Please insert local guardian's address",
    ],
  },
});

const studentSchema = new Schema<TStudent, TStudentModel, TStudentMethods>({
  id: {
    type: String,
    required: [true, 'Student ID is required. Please insert student ID'],
    unique: true,
  },
  name: {
    type: userNameSchema,
    required: [
      true,
      "Student's name is required. Please insert student's name",
    ],
  },
  gender: {
    type: String,
    enum: {
      values: ['male', 'female', 'other'],
      message:
        "{VALUE} is not valid. The gender can only be one of the following: 'male','female' or 'other'",
    },
    required: [true, 'Gender is required. Please insert gender'],
  },
  dateOfBirth: String,
  email: {
    type: String,
    required: [true, 'Email is required. Please insert email'],
    unique: true,
    validate: {
      validator: (value) => isEmail(value),
      message: 'Email is not valid',
    },
  },
  contactNo: {
    type: String,
    required: [
      true,
      'Contact number is required. Please insert contact number',
    ],
  },
  emergencyContactNo: {
    type: String,
    required: [
      true,
      'Emergency contact number is required. Please insert emergency contact number',
    ],
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'A-', 'AB+', 'AB-', 'B+', 'B-', 'O+', 'O-'],
  },
  presentAddress: {
    type: String,
    required: [
      true,
      'Present address is required. Please insert present address',
    ],
  },
  permanentAddress: {
    type: String,
    required: [
      true,
      'Permanent address is required. Please insert permanent address',
    ],
  },
  guardian: {
    type: guardianSchema,
    required: [
      true,
      'Guardian information is required. Please insert guardian details',
    ],
  },
  localGuardian: {
    type: localGuardianSchema,
    required: [
      true,
      'Local guardian information is required. Please insert local guardian details',
    ],
  },
  profileImg: String,
  isActive: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active',
  },
});

studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await StudentModel.findOne({ id });
  return existingUser;
};

export const StudentModel = model<TStudent, TStudentModel>(
  'Student',
  studentSchema,
);
