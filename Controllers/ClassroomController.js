import Classroom  from "../Models/ClassroomModel.js";
import jsonwebtoken from 'jsonwebtoken';

const secret = "secretkey";
export const createClassroom = async (req,res) => {
    const classroom = req.body;
    const newClassroom = new Classroom(classroom);
    try {
        await newClassroom.save();
        res.status(201).json(newClassroom);
    } catch (error) {
        res.status(409).json({message:error.message});
    }
}
export const getClassroombyId = async (req,res) => {
    try {
        const classroom = await Classroom.findById(req.params.id).populate('Students');
        res.status(200).json(classroom);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}
export const getClassroombyJwt = async (req,res) => {
    try {
        // console.log(req.body.token);
        const token = req.body.token;
        const decoded = jsonwebtoken.verify(token,secret);
        const classroom = await Classroom.findById(decoded).populate('Students').exec();
        res.status(200).json(classroom);        
    } catch (error) {
        res.status(500).json({message:error.message});
    }
}
export const getClassroom = async (req,res) => {
    try {
        const classname = req.body.Classname;
        const password = req.body.password;
        // console.log(req.body);
        const classroom = await Classroom.findOne({className:classname});
        // console.log(classroom);
        if(classroom===null)
        {
            console.log("Classroom not found");
            res.status(404).json({message:"Classroom not found"});
        }
        else{
            if(classroom.password!=password)
            {
                res.status(401).json({message:"Invalid Password"});
            }
            else{
                const _id = classroom._id;
                const token = jsonwebtoken.sign({_id},secret,{expiresIn:'24h'});
                res.status(200).json(token);
            }
        }
        // res.status(200).json(classroom);
    } catch (error) {
        res.status(404).json({message:error.message});
    }
}

export const updateClassroom = async (req,res)=>{
    console.log("here");
     try {
        console.log(req.body);
        console.log(req.params.id);
        const classroom = await
        Classroom.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(classroom);
    }
    catch (error) {
        res.status(500).json({error:error.message});
    }
}
