import express from 'express';
const Router = express.Router();
import {addStudent,deleteStudent,getStudent,updateStudent, addStudents , loginStudent} from '../Controllers/StudentController.js';

Router.post('/addStudent',addStudent);
Router.post('/addStudents',addStudents);
Router.delete('/deleteStudent/:id',deleteStudent);
Router.post('/getStudent',getStudent);
Router.post('/loginStudent',loginStudent);
Router.put('/updateStudent/:id',updateStudent);

export default Router;
