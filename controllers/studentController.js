import * as StudentModel from '../models/studentModel.js';

export const fetchStudents = async (req, res) => {
    try {
        const students = await StudentModel.getStudents();
        res.status(200).json({sucess: true, message: students});
    } catch(e){
        console.log(e);
        res.status(500).json({
            sucess: false,
            message: "Interval Server Error"
        })
    }
};