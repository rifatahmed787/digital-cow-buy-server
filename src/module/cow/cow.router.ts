import { Router } from "express";
import { verifyCow, verifyCowQuery, verifyCowUpdate } from "./cow.validation";
import { createCow, deleteCow, getAllCow, getCowById, updateCow } from "./cow.controller";
import { verifyParams } from "../../middleware/verifyParams";

const router = Router();

router.post('/create-cow', verifyCow, createCow)
router.patch('/update-cow/:id', verifyParams, verifyCowUpdate, updateCow)
router.get('/get-single-cow/:id', verifyParams, getCowById)
router.get('/get-cow', verifyCowQuery,  getAllCow)
router.delete('/delete-cow/:id', verifyParams,  deleteCow)


export default router;