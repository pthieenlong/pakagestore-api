import express, { Request, Response } from "express";
import CART_STATUS from "../Config/CartStatus";
import Order from "../Model/Order";
import Product from "../Model/Product";

export class OrderController {
    public createOrder = async (req: Request, res: Response) => {
        const { owner } = req.body;
        if(!owner) return res.status(400).json({ message: "Properties are required!"} );
        const order = await Order.findOne({ owner: owner });
        if(order) return res.json(order);
        try {
            const result = await Order.create({
                owner: owner,
                items: [],
                total: 0,
                status: CART_STATUS.UNPAY
            });
            res.status(200).json({ message: "success" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    public updateOrder = async (req: Request, res: Response) => {

    }
    public getAllOrders = async (req: Request, res: Response) => {
        const orders = await Order.find();
        if(!orders) return res.status(204).json({ message: "Orders not founded!" });
        return res.json(orders);
    }
    public getAllOrdersOfOwner = async (req: Request, res: Response) => {
        const { owner } = req.body;
        if(!owner) return res.status(400).json({ message: "Properties are required!" });
        // const orders = await Order.find();
    }
    public getOrderOfOwner = async (req: Request, res: Response) => {
        
    }
    public deleteOrder = async (req: Request, res: Response) => {
        
    }
    public getOrder = async (req: Request, res: Response) => {
        
    }
    public addItem = async (req: Request, res: Response) => {
        const { owner, itemID } = req.body;
        if(!itemID || !owner) return res.status(400).json({ message: "Properties are required!" });
        const order = await Order.findOne({ owner: owner, status: CART_STATUS.UNPAY }).exec();
        if(!order) return res.status(204).json({ message: "Order not founded "});
        const product = await Product.findOne({ _id: itemID }).exec();
        if(!product) return res.status(204).json({ message: "Product not founded!" });
        const items = order.items;
        const findItem = items.find((val) => val.id == product.id);
        if(findItem) {
            findItem.quantity += 1;
            findItem.price += product.price;

            order.items[items.findIndex((val) => { val.id == findItem.id })] = findItem;
            await order.save();

            return res.status(200).json({ message: "Updated success!" });
        } else {
            order.items.push({
                id: product.id,
                name: product.name,
                quantity: 1,
                price: product.price,
            });
            const result = await order.save();
            return res.status(200).json({ message: "Add item success!" });
        }
    }
    public updateItem = async (req: Request, res: Response) => {
        const { owner, itemID, quantity } = req.body;
        if(!itemID || owner || quantity) return res.status(400).json({ message: "Properties are required!" });
        const order = await Order.findOne({ owner: owner, status: CART_STATUS.UNPAY }).exec();
        if(!order) return res.status(204).json({ message: "Order not founded" });
        const product = await Product.findOne({ _id: itemID }).exec();
        if(!product) return res.status(204).json({ message: "Product not founded" });
        const items = order.items;
        const findItem = items.find((val) => val.id == product.id);
        if(findItem) {
            findItem.quantity = quantity;
            findItem.price = (product.price * quantity);

            order.items[items.findIndex((val) => { val.id == findItem.id })] = findItem;
            await order.save();

            return res.status(200).json({ message: "Update success!" });
        }
    }
    public deleteItem = async (req: Request, res: Response) => {
        const { owner, itemID } = req.body;
        if(!owner || !itemID) return res.status(400).json({ message: "Properties are required!" });
        
    }
}