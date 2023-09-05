import { Router } from "express";
import { verifyOrder } from "./order.validation";
import { createOrder, getAllOrder, getOrderById } from "./order.controller";
import { verifyParams } from "../../middleware/verifyParams";

const router = Router();

router.post('/create-order', verifyOrder, createOrder)
router.get('/get-order',  getAllOrder)
router.get('/get-single-order/:id', verifyParams, getOrderById)


export default router;