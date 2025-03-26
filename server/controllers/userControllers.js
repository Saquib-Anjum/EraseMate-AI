import userModel from '../models/userModel.js';
import svixPackage from 'svix';
const { webhook } = svixPackage;

// const clerkwebhooks = async (req, res) => {
//     try {
//         // Create Svix instance with Clerk webhook secret
//         const whook = new webhook(process.env.CLERK_WEBHOOK_SECRET);

//         // Verify the webhook request
//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });

//         const { data, type } = req.body;
//         console.log("Data ",data)
//         switch (type) {
//             case "user.created": {
//                 const userData = {
//                     clerkId: data.id,
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url
//                 };
//                 await userModel.create(userData);
//                 res.status(200).json({ success: true, message: "User created successfully" });
//                 break;
//             }
//             case "user.updated": {
//                 const userData = {
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     photo: data.image_url
//                 };
//                 await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
//                 res.status(200).json({ success: true, message: "User updated successfully" });
//                 break;
//             }
//             case "user.deleted": {
//                 await userModel.findOneAndDelete({ clerkId: data.id });
//                 res.status(200).json({ success: true, message: "User deleted successfully" });
//                 break;
//             }
//             default:
//                 res.status(400).json({ success: false, message: "Unsupported event type" });
//                 break;
//         }
//     } catch (err) {
//         console.error(`Webhook error: ${err.message}`);
//         res.status(500).json({ success: false, message: err.message });
//     }
// };

export { clerkwebhooks };