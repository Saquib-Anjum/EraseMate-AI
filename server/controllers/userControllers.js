import dotenv from "dotenv";
dotenv.config(); // ✅ ensures env variables are available
import userModel from "../models/userModel.js";
import transactionModel from '../models/transactionModel.js'
import razorpay from "razorpay";

import svix from "svix";
const { Webhook } = svix;
import authUser from "../middlewares/auth.js";

const clerkwebhooks = async (req, res) => {
  try {
    console.log("Headers:", req.headers);
    const requiredHeaders = ["svix-id", "svix-timestamp", "svix-signature"];
    for (const header of requiredHeaders) {
      if (!req.headers[header]) {
        return res.status(400).json({
          success: false,
          message: `Missing required header: ${header}`,
        });
      }
    }
    const secret = process.env.CLERK_WEBHOOK_SECRET;
    console.log("CLERK_WEBHOOK_SECRET", secret); // Debug check

    const whook = new Webhook(secret);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
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
          photo: data.image_url,
        };
        await userModel.create(userData);
        return res
          .status(200)
          .json({ success: true, message: "User created successfully" });
      }
      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        return res
          .status(200)
          .json({ success: true, message: "User updated successfully" });
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        return res
          .status(200)
          .json({ success: true, message: "User deleted successfully" });
      }
      default:
        return res
          .status(400)
          .json({ success: false, message: "Unsupported event type" });
    }
  } catch (err) {
    console.error(`Webhook error: ${err.message}`);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//api controller for credits of user
const userCredit = async (req, res) => {
  try {
    const { clerkId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    res.json({
      success: true,
      credits: userData.creditBalance,
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//payment gatway
const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
//API to make payment for credits
const paymentRazorpay = async (req, res) => {
  try {
    const { clerkId, planId } = req.body;
    const userData = await userModel.findOne({ clerkId });
    if (!userData || !planId) {
      return res.json({
        success: false,
        message: "Invalid Credentials ",
      });
    }
    let credits, plan, amount, date;
    switch (planId) {
      case "Basic":
        plan = "Basic"
        credits = 100;
        amount = 10 * 87;
        break;

      case "Advanced":
        plan = "Advanced";
        credits = 500;
        amount = 50 * 87;
        break;
      case "Business":
        plan = "Business"
        credits = 500;
        amount = 250 * 87;
        break;

      default:
        return res.status(400).json({
          success: false,
          message: "Invalid planId",
        });
        break;
    }
    date = Date.now();
    //creating transaction \
    const transactionData = {
      clerkId,
      plan,
      amount,
      credits,
      date,
    }
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id
    }

    razorpayInstance.orders.create(options, (error, order) => {
      if (error) {
        res.json({
          success: false,
          message: error,
        })
      }
      res.json({
        success: true,
        order
      })
    })
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
};

//api controller function to verify razorpay payment

const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    if (orderInfo.status === 'paid') {
      const transactionData = await transactionModel.findById(orderInfo.receipt);
      if (transactionData.payment) {
        return res.json({ success: false, message: "Payment Failed" })
      }
      //upading db
      const userData = await userModel.findOne({ clerkId: transactionData.clerkId })
      const creditBalance = userData.creditBalance + transactionData.credits;
      await userModel.findByIdAndUpdate(userData._id, { creditBalance: creditBalance })

      //making the payment true

      await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });
      res.json({
        success: true,
        message: "Credit 🪙 Updated"
      })
    }    
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ success: false, message: err.message });
  }
}
export { clerkwebhooks, userCredit, paymentRazorpay, verifyRazorpay };
