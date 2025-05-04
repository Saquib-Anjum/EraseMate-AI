import jwt from 'jsonwebtoken';
//middleware function to ecode jwt function 
const authUser = async (req , res , next )=>{
try{
const {token} = req.headers;
if(!token){
    return res.json({
        success:false,
        message:"Not authorized Login again 😔"
    })
    const token_decode = jwt.decode(token);
    req.body.clerkId = token_decode.clerkId;
    next()
}
}catch(err){
    return res.status(500).json({ success: false, message: err.message });
}
}
export default authUser;