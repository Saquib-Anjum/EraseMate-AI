import express from 'express';
import { clerkwebhooks,userCredit } from '../controllers/userControllers.js';
import authUser from '../middlewares/auth.js'
const userRouter = express.Router()
userRouter.post('/webhooks',clerkwebhooks);
userRouter.get('/credit',authUser,userCredit);

export default userRouter;