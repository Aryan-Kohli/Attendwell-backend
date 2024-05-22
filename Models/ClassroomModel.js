import mongoose from "mongoose";
import Student from "./StudentModel.js";
const classroomSchema = new mongoose.Schema({
    className:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    Branch :{
        type:String,
        required:true,
    },
    Batch:{
        type:String,
        required:true,
    },
    TotalStudents:{
        type:Number,
        required:true
    },
    Subjects:{
        type:[String],
        required:true
    },
    AdminId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Teacher'
    },
    Students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }]
});

const Classroom = mongoose.model("Classroom",classroomSchema);
export default Classroom;