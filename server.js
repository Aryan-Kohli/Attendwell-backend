import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import StudentRoutes from "./routes/StudentRoutes.js";
import TeacherRoutes from "./routes/TeacherRoutes.js";
import ClassroomRoutes from "./routes/ClassroomRoutes.js";
import cors from 'cors';
const app = express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const corsOptions = {
//   origin: 'http://localhost:5173', 
//   origin: 'https://attend-well.netlify.app/', 
  origin: '*', 
  credentials: true 
};
app.use(cors(corsOptions));

app.use("/student",StudentRoutes);
app.use("/teacher",TeacherRoutes);
app.use("/classroom",ClassroomRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});
mongoose.connect(process.env.MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {    
    console.log('Connected to MongoDB');

}).catch((err)=>{
    console.log("error : ",err);
})
app.listen(3000, () => {    
    console.log('Server is running on port 3000');
});