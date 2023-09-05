import { Schema, model } from "mongoose";
import { ICow } from "./cow.interface";

const cowSchema = new Schema<ICow>({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true,
        enum: ["Dhaka",
            "Chattogram",
            "Barishal",
            "Rajshahi",
            "Sylhet",
            "Comilla",
            "Rangpur",
            "Mymensingh"]
    },
    breed: {
        type: String,
        required: true,
        enum: ["Brahman",
            "Nellore",
            "Sahiwal",
            "Gir",
            "Indigenous",
            "Tharparkar",
            "Kankrej"]

    },
    weight: {
        type: Number,
        required: true
    },
    lebel: {
        type: String,
        enum: ["For_Sale", "Sold_Out"],
        default: "For_Sale"
    },
    category: {
        type: String,
        required: true,
        enum: ["Dairy" , "Beef" ,"DualPurpose"]
    },
    seller: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
},{
    timestamps:true
})

export const Cow = model<ICow>('Cow', cowSchema)