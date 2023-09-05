import { Router } from "express";
import userRouter from "../module/user/user.index";
import cowRouter from "../module/cow/cow.index";
import orderRouter from "../module/order/order.index";

const router = Router();


router.use('/user', userRouter)
router.use('/cow', cowRouter)
router.use('/order', orderRouter)


export default router;