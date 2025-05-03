import mongoose from 'mongoose'
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async()=>{
    mongoose.connection.on('connected',()=>{
        console.log('DB Connected')
    })
    await mongoose.connect(`${process.env.MONGO_URI}/EraseMateAI`)
}
export default connectDB