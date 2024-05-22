import { createClassroom, getClassroom,updateClassroom , getClassroombyId , getClassroombyJwt } from "../Controllers/ClassroomController.js";

import express from "express";
const router = express.Router();
router.post('/getclassroom',getClassroom);
router.post('/createClassroom',createClassroom);
router.get('/getbyid/:id',getClassroombyId);
router.post('/getbyjwt',getClassroombyJwt);
router.put('/updateclassroom/:id',updateClassroom);

export default router;
