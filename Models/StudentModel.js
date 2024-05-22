import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    enrollNo:{
        type:String,
        required:true,
    },
    orgname:{
        type:String,
        required:true,
    },
    data:[
            
            {
                className:{
                    type:String,
                    required:true,
                },
                subject:{
                    type:String,
                    required:true,
                },
                classData:[
                    {
                        date:{
                            type:Object,
                            required:true,
                        },
                        attendance:{
                            type:Boolean,
                            required:true,
                        }
                    }
                ]
            }
    ]
});

const Student = mongoose.model("Student",studentSchema);
export default Student;