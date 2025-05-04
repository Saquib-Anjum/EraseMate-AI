import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';
import fs from 'fs';
import FormData from 'form-data';
import userModel from '../models/userModel.js';
const api_key = process.env.CLIPDROP_API_KEY;
//controller function to remove bg
const removeBgImage = async (  req , res )=>{

    try{
     const {clerkId} = req.body;
     const user = await userModel.findOne({clerkId});
     if(!user){
     return res.json({
        success:false,
        message:"User not found 😓"
     })
     }
     if(user.creditBalance===0){
       return res.json({
        success:false,
        message:"No credit Balance 🫰",
        creditBalance:user.creditBalance,
       })
     }
     const imagePath = req.file.path;
     //reading the image file 
     const imageFile = fs.createReadStream(imagePath);
     const formData = new FormData();
     formData.append('image_file',imageFile);
     const {data} = await axios.post(`https://clipdrop-api.co/remove-background/v1`,formData,{
        headers:{
            'x-api-key':api_key,
        },
        responseType:'arraybuffer',
        
    
    })
    const base64Image = Buffer.from(data,'binary').toString('base64') ;
    const resultImage = `data:${req.file.mimetype};base64,${base64Image}`

    await userModel.findByIdAndUpdate(user._id,{creditBalance:user.creditBalance-1});
    
    res.json({
        success:true,
        resultImage,
        creditBalance: user.creditBalance-1,
        message:"Background Removed 🪧"

    })
   
    }catch(err){
       res.json({
        success:false,
        message:err.message
       }) 
    }
}

export {removeBgImage} 
