import { NextFunction, Request, Response } from "express";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import mongoose from "mongoose";

export const createOrder = async (req: Request, res: Response, next: NextFunction) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { cow, buyer } = req.body;

        const order: IOrder = {
            cow,
            buyer
        }
        const findCow = await Cow.findById(cow)
        const findbuyer = await User.findById(buyer)

        if (!findCow || !findbuyer) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Cow or Buyer not Found"
            })
        }

        if (findbuyer.role !== "Buyer") {
            return res.status(404).send({
                success: false,
                statusCode: 400,
                message: "You are not a buyer"
            })
        }

        const findSeller = await User.findById(findCow.seller)

        if (findCow.lebel !== "For_Sale") {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: "Cow already sold out"
            })
        }

        if (findbuyer.budget && findbuyer.budget < findCow.price) {
            return res.status(400).send({
                success: false,
                statusCode: 400,
                message: "Insufficient Your Budget"
            })
        }

        if (findbuyer.budget) {
            findbuyer.budget = findbuyer.budget - findCow.price;
            await findbuyer.save();
        }
        console.log(findSeller?.income)
        if (findSeller) {
            findSeller.income = (findSeller.income ? findSeller.income : 0) + findCow.price;
            await findSeller.save();
            findCow.lebel = "Sold_Out";
            await findCow.save()
        }





        const result = await Order.create(order)

        await session.commitTransaction();
        await session.endSession();

        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "Order Created Success",
            data: result
        })
    }
    catch (err) {
        await session.commitTransaction();
        await session.endSession();
        next(err)
    }
}

export const getAllOrder = async (req: Request, res: Response, next: NextFunction) =>{
    try{
        const { page, limit } = req.query;
        const skipPage = (parseInt(page as string) - 1) || 0;
        const itemPerPage = (parseInt(limit as string)) || 10;
        const result = await Order.find()
            .skip(skipPage * itemPerPage)
            .limit(itemPerPage)
            .populate('buyer cow')


        res.status(200).send({
            success: true,
            statusCode: 200,
            pagination: {
                page: skipPage,
                limit: itemPerPage
            },
            message: "Order Get Success",
            data: result
        })
    }
    catch(err){
        next(err)
    }
}


export const getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await Order.findById(id)
        .populate('buyer cow');
        if (!result) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Order Not Found",
            })
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Single Order Get Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}