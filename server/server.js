import dotenv from 'dotenv';
dotenv.config()
import express from 'express';
import cors from 'cors';
import connectDB from './configs/mongoDB.js';
import userRouter from './routes/userRoutes.js';
//app config
const PORT =process.env.PORT ||4000;
console.log("process.env.PORT",process.env.PORT)
const app = express();
await connectDB()

//initilization middlewares
app.use(express.json());
app.use(cors())
//api routes
  app.use('/api/user',userRouter)
//listen app
app.listen(PORT,()=>{
    console.log(`server is running in  : http://localhost:${PORT}`)
})