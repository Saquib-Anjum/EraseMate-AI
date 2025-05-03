import dotenv from 'dotenv';
dotenv.config(); // ✅ ensures env variables are available
import userModel from '../models/userModel.js';

import svix from 'svix';
const { Webhook } = svix;



const clerkwebhooks = async (req, res) => {
    try { 
        const requiredHeaders = ["svix-id", "svix-timestamp", "svix-signature"];
        for (const header of requiredHeaders) {
            if (!req.headers[header]) {
                return res.status(400).json({
                    success: false,
                    message: `Missing required header: ${header}`
                });
            }
        }
        const secret = process.env.CLERK_WEBHOOK_SECRET;
        console.log("CLERK_WEBHOOK_SECRET", secret); // Debug check

        const whook = new Webhook(secret);

        await whook.verify(JSON.stringify(req.body), {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"]
        });

        const { data, type } = req.body;
        console.log("Webhook Event Type:", type);
        console.log("Data:", data);

        switch (type) {
            case "user.created": {
                const userData = {
                    clerkId: data.id,
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };
                await userModel.create(userData);
                return res.status(200).json({ success: true, message: "User created successfully" });
            }
            case "user.updated": {
                const userData = {
                    email: data.email_addresses[0].email_address,
                    firstName: data.first_name,
                    lastName: data.last_name,
                    photo: data.image_url
                };
                await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
                return res.status(200).json({ success: true, message: "User updated successfully" });
            }
            case "user.deleted": {
                await userModel.findOneAndDelete({ clerkId: data.id });
                return res.status(200).json({ success: true, message: "User deleted successfully" });
            }
            default:
                return res.status(400).json({ success: false, message: "Unsupported event type" });
        }
    } catch (err) {
        console.error(`Webhook error: ${err.message}`);
        return res.status(500).json({ success: false, message: err.message });
    }
};

export { clerkwebhooks };
