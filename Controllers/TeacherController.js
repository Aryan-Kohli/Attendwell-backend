import { response } from "express";
import Teacher from "../Models/TeacherModel.js";
// const jwt = require('jsonwebtoken');
import jsonwebtoken from 'jsonwebtoken';

const secret = 'secretkey';
export const addTeacher = async (req,res)=>{
    try{
        const teacher  =  new Teacher(req.body);
        await teacher.save();
        console.log("teacher added successfully");
        res.status(200).json("Teacher added successfully");
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
export const deleteTeacher = async (req,res)=>{
    try{
        const teacher  =  await Teacher.findByIdAndDelete(req.params.id);
        res.status(200).json("teacher deleted successfully");
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
export const getTeacher = async (req,res)=>{ 
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken.verify(token,secret);
        const admin = await Teacher.findById(decoded._id).populate({
            path:'classrooms'
        }).exec();
        res.status(200).json(admin);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
export const getTeachers = async (req,res)=>{
    try{
        const teachers = await Teacher.find();
        res.status(200).json(teachers);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
export const loginTeacher = async (req,res)=>{
    try{
        const username = req.body.username;
        const password = req.body.password;
        // console.log(username,password);
        const teacher = await Teacher.findOne({username:username});
        if(teacher === null)
        {
            res.status(404).json("Teacher not found");
        }
        else
        {

            if(teacher.password === password)
            {
                const _id = teacher._id;
                const token = jsonwebtoken.sign({_id},secret,{expiresIn:'24h'});
                res.status(200).json(token);
            }
            else
            {
                res.status(401).json("Invalid password");
            }
        }
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}

export const updateTeacher = async (req,res)=>{
    console.log(req.body);
    try{
        console.log(req.params.id);
        const teacher = await Teacher.findByIdAndUpdate
        (req.params.id,req.body,{new:true});
        res.status(200).json(teacher);
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}

