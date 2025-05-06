import express from 'express';
import { clerkwebhooks,userCredit ,paymentRazorpay,verifyRazorpay} from '../controllers/userControllers.js';
import authUser from '../middlewares/auth.js'
const userRouter = express.Router()
userRouter.post('/webhooks',clerkwebhooks);
userRouter.get('/credit',authUser,userCredit);
userRouter.post('/pay-razor',authUser,paymentRazorpay);

//varify payment
userRouter.post('/verify-razor',verifyRazorpay);
export default userRouter;