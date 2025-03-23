import userModel from '../models/userModel.js'
import svixPackage from 'svix';
const { webhook } = svixPackage;
//API controller function to manage clerk user database
//http://localhost:4000/api/user/webhooks

const clerkwebhooks = async (req,res)=>{
try{
//create svix instance with clerk webhook secret.
const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET);
await whook.verify(JSON.stringify(req.body),{
"svix-id" :req.headers["svix-id"],
"svix-timestamp" : req.headers["svix-timestamp"],
"svix-signature": req.headers["svix-signature"]
});
const {data,type} = req.body;
switch(type){
    case "user.created":{
        const userData = {
            clerkId:data.id,
            email:data.email_addresses[0].email_address,
            firstName:data.first_name,
            lastName:data.last_name,
            photo:data.image_url

        }
        await userModel.create(userData);
        res.json({
            
        })
     break;
    }
    case "user.updated":{
        const userData = {
           
            email:data.email_addresses[0].email_address,
            firstName:data.first_name,
            lastName:data.last_name,
            photo:data.image_url

        }
       await userModel.findOneAndUpdate({clerkId :data.id},userData);
       res.json({

       })
        break;
       }
       case "user.deleted":{
        await userModel.findOneAndDelete({clerkId:data.id});
        res.json({

        })
        break;
       }
    default:
        break

}

}catch(err){
console.log(err.message)
res.json({
    success:false,
    message:err.message
})
}
}
export {clerkwebhooks}