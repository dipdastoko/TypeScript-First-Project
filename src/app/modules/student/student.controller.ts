import { Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const createStudent = async (req: Request, res: Response) => {
  try {
    // Joi schema for Guardian
    // creating a schema validation using joi

    const { student: studentData } = req.body;
    const { error, value } = studentValidationSchema.validate(studentData);

    const result = await StudentServices.createStudentIntoDB(studentData);

    console.log(value);
    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      sucess: true,
      message: 'Student is created sucessfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrongs',
      error: err,
    });
  }
};

const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
      success: true,
      message: 'All the students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

const getSingleStudent = async (req: Request, res: Response) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    res.status(200).json({
      success: true,
      message: 'Student Found',
      data: result,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: 'something went wrong',
      error: err,
    });
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudent,
};
