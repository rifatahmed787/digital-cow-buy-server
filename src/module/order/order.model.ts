import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
    cow: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Cow'
    },
    buyer: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},{
    timestamps: true
})

export const Order = model<IOrder>('Order', orderSchema)