import { NextFunction, Request, Response } from "express";
import { Cow } from "./cow.model";
import { ICow } from "./cow.interface";
import { User } from "../user/user.model";
import { searchTermDefination } from "../../utilitis/serchTerm";

export const createCow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            age,
            price,
            location,
            breed,
            category,
            weight,
            seller, } = req.body;

        const cow: ICow = {
            name,
            age,
            price,
            location,
            breed,
            weight,
            category,
            seller
        }

        const findSeller = await User.findById(seller)
        if ((findSeller && findSeller.role !== "Seller") || !findSeller) {
            throw new Error("Invalid Seller Id")
        }

        const result = await Cow.create(cow)
        res.status(201).send({
            success: true,
            statusCode: 201,
            message: "Cow Created Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const updateCow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            name,
            age,
            price,
            location,
            breed,
            category,
            weight,
        } = req.body;
        const { id } = req.params;
        const cow = {
            name,
            age,
            price,
            location,
            breed,
            weight,
            category
        }

        const result = await Cow.findByIdAndUpdate(id, cow, { new: true })
        res.status(201).send({
            success: true,
            statusCode: 200,
            message: "Cow Update Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}


export const getAllCow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { searchTerm, page, limit, minPrice, maxPrice, location, sortBy, sortOrder } = req.query;
        const skipPage = (parseInt(page as string) - 1) || 0;
        const itemPerPage = (parseInt(limit as string)) || 10;

        let filterAndSerch = [];
        if (typeof searchTerm === 'string' && searchTerm.length > 0) {
            filterAndSerch.push(searchTermDefination(searchTerm));
            
        }
        console.log(minPrice)
        if (minPrice) {
            filterAndSerch.push({ price: { $gte: parseInt(minPrice as string) } });
        }
        if (maxPrice) {
            filterAndSerch.push({ price: { $lte: parseInt(maxPrice as string) } });
        }
        if (location) {
            filterAndSerch.push({ location });
        }

        const conditions = filterAndSerch.length > 0 ? { $and: filterAndSerch } : {};

        let sortOptions: any = {};
        if (sortBy === 'price') {
            sortOptions.price = sortOrder === 'asc' ? 1 : -1;
        }
        //  else {
        //     sortOptions.createdAt = 1
        // }
        const result = await Cow.find(conditions)
            .sort(sortOptions)
            .skip(skipPage * itemPerPage)
            .limit(itemPerPage);

        res.status(200).send({
            success: true,
            message: "Get Cow Success",
            pagination: {
                page: skipPage,
                limit: itemPerPage
            },
            data: result
        });
    } catch (err) {
        next(err);
    }
}

export const getCowById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await Cow.findById(id)
            .populate('seller');
        if (!result) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Cow Not Found"
            })
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Single Cow Get Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}
export const deleteCow = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.params;
        const result = await Cow.findByIdAndDelete(id)
            .populate('seller');
        if (!result) {
            return res.status(404).send({
                success: false,
                statusCode: 404,
                message: "Cow Not Found",
            })
        }
        res.status(200).send({
            success: true,
            statusCode: 200,
            message: "Cow Deleted Success",
            data: result
        })
    }
    catch (err) {
        next(err)
    }
}