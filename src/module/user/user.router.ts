import { Router } from "express";
import { verifyUser, verifyUserUpdate } from "./user.validation";
import { createUser, deleteUser, getAllUser, getUserById, updateUser } from "./user.controller";
import { verifyParams } from "../../middleware/verifyParams";
import { verifyCowQuery } from "../cow/cow.validation";

const router = Router();

router.post('/create-user', verifyUser, createUser)
router.patch('/update-user/:id', verifyParams, verifyUserUpdate, updateUser)
router.get('/get-single-user/:id', verifyParams, getUserById)
router.get('/get-user', verifyCowQuery, getAllUser)
router.delete('/delete-user/:id', verifyParams,  deleteUser)


export default router;