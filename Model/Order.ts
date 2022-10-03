import mongoose, { Schema } from "mongoose";
import CART_STATUS from "../Config/CartStatus";

interface IOrder {
    owner: string,
    items: [
        {
            id: string,
            name: string,
            quantity: number,
            price: number,
        }
    ],
    total: number,
    status: String,
}

const orderSchema = new Schema<IOrder>({
    owner: {
        type: String,
        required: true,
    },
    items: {
        type: [{
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: 1,
            },
            price: {
                type: Number,
                required: true,
            }
        }],
        required: false,
        default: []
    },
    total: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: CART_STATUS.UNPAY,
    }
}, { timestamps: true });
export default mongoose.model("Order", orderSchema);