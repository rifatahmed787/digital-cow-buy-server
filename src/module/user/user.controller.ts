import { NextFunction, Request, Response } from "express";
import { IUser } from "./user.interface";
import { User } from "./user.model";

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            phoneNumber,
            password,
            role,
            firstName,
            lastName,
            address,
            budget, } = req.body;
        if (role === "Buyer" && !budget) {
            throw new Error("Budget Is Required")
        }
        const user: IUser = {
            phoneNumber,
            role,
            name: {
                firstName,
                lastName
            },
            password,
            address,
            budget: role === "Buyer" ? budget : 0
        }

        const result = await User.create(user)
        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "User Created Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            phoneNumber,
            password,
            firstName,
            lastName,
            address, } = req.body;
        const id = req.params.id;

        if (firstName && !lastName) {
            throw new Error("You want to first name change but your last Name undifined")
        }
        if (lastName && !firstName) {
            throw new Error("You want to last name change but your first Name undifined")
        }


        const user = {
            phoneNumber,
            name: {
                firstName,
                lastName
            },
            password,
            address
        }

        const result = await User.findByIdAndUpdate(id, user, { new: true })
        console.log(result)
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "User Update Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}


export const getAllUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { page, limit } = req.query;
        const skipPage = (parseInt(page as string) - 1) || 0;
        const itemPerPage = (parseInt(limit as string)) || 10;
        console.log(limit)
        const result = await User.find()
            .skip(skipPage * itemPerPage)
            .limit(itemPerPage)


        res.status(200).send({
            success: true,
            statusCode: 200,
            pagination: {
                page: skipPage,
                limit: itemPerPage
            },
            message: "User Get Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await User.findById(id);
        if (!result) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "User Not Found",
            })
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Single User Get Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await User.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "User Not Found",
            })
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "User Deleted Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}