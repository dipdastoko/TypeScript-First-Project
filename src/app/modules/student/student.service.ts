import { TStudent } from './student.interface';
import { StudentModel } from './student.model';

const createStudentIntoDB = async (studentData: TStudent) => {
  // const result = await StudentModel.create(student); //built-in static method

  const student = new StudentModel(studentData); //create an instance
  if (await student.isUserExists(studentData.id)) {
    throw new Error('User already exists');
  }
  const result = await student.save();
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

export const StudentServices = {
  createStudentIntoDB,
  getAllStudentsFromDB,
  getSingleStudentFromDB,
};
