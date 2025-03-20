import 'dotenv/config';
import express from 'express'
import cors from 'cors'
import connectDB from './configs/mongoDB.js'
//app config
const PORT =process.env.PORT ||4000;
const app = express();
await connectDB()

//initilization middlewares
app.use(express.json());
app.use(cors())
//api routes

app.get('/', (req, res) => {
    res.send("Hello World");
  });
//listen app
app.listen(PORT,()=>{
    console.log(`server is running in  : http://localhost:${PORT}`)
})