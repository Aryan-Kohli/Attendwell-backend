import Student from "../Models/StudentModel.js";
import jsonwebtoken from 'jsonwebtoken';

export const addStudent = async (req,res)=>{
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}
export const addStudents = async (req, res) => {
    try {
        const studentsData = req.body; 
        const students = await Student.insertMany(studentsData);
        res.status(201).json(students);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


export const getStudents = async (req,res)=>{
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

export const loginStudent = async (req,res)=>{
    try{
        const student = await Student.findOne({name:req.body.name, enrollNo:req.body.enrollNo,orgname:req.body.orgname});
        if(student === null)
        {
            res.status(404).json({message:"Student not found"});
        }
        if(student.password === req.body.password)
        {
            const _id = student._id;
            const token = jsonwebtoken.sign({_id},"secret",{expiresIn:'24h'});
            res.status(200).json({token:token});
        }
        else
        {
            res.status(401).json({message:"Invalid Credentials"});
        }
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}

export const getStudent = async (req,res)=>{
    // res.status(200).json({message:"Student found"});
    // console.log(req.headers);
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken.verify(token,"secret");
        const student = await Student.findById(decoded._id);
        if(student === null)
        {
            res.status(401).json({message:"Student not found"});
        }
        else
        res.status(200).json(student);
    } catch (error) {
        res.status(404).json({error:error.message});
    }
}

export const updateStudent = async (req,res)=>{
    try {
        const student = await
        Student.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json(student);
    }
    catch (error) {
        res.status(500).json({error:error.message});
    }
}
export const deleteStudent = async (req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id);
        res.status(200).json({message:"Student deleted successfully"});
    }
    catch(error)
    {
        res.status(500).json({error:error.message});
    }
}
// export const updatestudents = async (req,res)=>{
//     try{

//     }
//     catch(error)
//     {
//         res.status(500).json({error:error.message});
//     }
// }