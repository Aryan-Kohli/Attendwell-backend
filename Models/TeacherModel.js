import express from "express";
import  mongoose  from "mongoose";
import Classroom from "./ClassroomModel.js";
const teacherSchema = new mongoose.Schema({
  name :{
    type:String,
    required:true,
  },
  username:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  orgname:{
    type:String,
    required:true,
  },
  classrooms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Classroom' }]
})

const Teacher = mongoose.model("Teacher",teacherSchema);
export default Teacher;