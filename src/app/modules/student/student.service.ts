import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  if (await StudentModel.isUserExists(studentData.id)) {
    throw new Error('User already exists!');
  }
  const result = await StudentModel.create(studentData); //built-in static method

  // const student = new StudentModel(studentData); //create an instance
  // if (await student.isUserExists(studentData.id)) {
  //   throw new Error('User already exists');
  // }
  // const result = await student.save();
  return result;
};

const getAllStudentsFromDB = async () => {
  const result = await StudentModel.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const reuslt = await StudentModel.findOne({ id: studentId });
  return reuslt;
};
const deleteStudentFromDB = async (studentId: string) => {
  const reuslt = await StudentModel.updateOne(
    { id: studentId },
    { isDeleted: true },
  );
  return reuslt;
};

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
