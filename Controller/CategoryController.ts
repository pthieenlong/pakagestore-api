import { ExecOptions } from "child_process";
import express, { Request, Response } from "express";
import { json } from "stream/consumers";
import Category from "../Model/Category";

export class CategoryController {
    public getCategory = async (req: Request, res: Response) => {
        const categories = await Category.find();
        if(!categories) return res.status(204).json({ message: "Categories not founded!" });
        res.status(200).json(categories)
    }
    public createCategory = async (req: Request, res: Response) => {
        const { name } = req.body;
        if(!name) return res.status(400).json({ message: "Properties are required!" });
        const duplicate = await Category.findOne({ name: name }).exec();
        if(duplicate) res.sendStatus(409);
        try {
            await Category.create({
                name: name
            });
            res.json({ message: "Create succeed" });
        } catch (error: any) {
            res.status(500).json({ message: error.message });
        }
    }
    public updateCategory = async (req: Request, res: Response) => {
        const { id } = req.body;
        if(!id) return res.status(400).json({ message: "Properties are required!" });
        const category = await Category.findOne({ _id: id }).exec();
        if(!category) res.status(204).json({ message: "Category not founded" });
        else {
            if(req.body.name) category.name = req.body.name;

            await category.save();

            res.json({ message: "Update Succeed" });
        } 
    }
    public deleteCategory = async (req: Request, res: Response) => {
        
    }
}