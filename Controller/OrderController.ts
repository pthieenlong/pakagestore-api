import express, { Request, Response } from "express";
import CART_STATUS from "../Config/CartStatus";
import Order from "../Model/Order";
import Product from "../Model/Product";

export class OrderController {
    public getOrder = async (req: Request, res: Response) => {
        
    }
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
    public addItem = async (req: Request, res: Response) => {
        const { owner, item } = req.body;
        if(!item || !owner) return res.status(400).json({ message: "Properties are required!" });
        const order = await Order.findOne({ owner: owner, status: CART_STATUS.UNPAY });
        if(!order) return res.status(204).json({ message: "Order not founded "});
        const items = order.items;
        const product = await Product.find({ _id: item.id });
        if(!product) return res.status(204).json({ message: "Product not founded!" });
        

    }
    public removeItem = async (req: Request, res: Response) => {
        
    }
    public updateItem = async (req: Request, res: Response) => {
        
    }
    public deleteItem = async (req: Request, res: Response) => {
        
    }
}