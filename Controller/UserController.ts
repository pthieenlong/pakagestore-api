import express, { Request, Response } from "express";
import User from "../Model/User";
import bcrypt from "bcrypt";

export class UserController {
    public getAllUser = async (req: Request, res: Response) => {
        const users = await User.find();
        if(!users) return res.status(204).json({
            message: "No user founded",
        });
        return res.json(users);
    }
    public createUser = async (req: Request, res: Response) => {
        const { role, username, password, fullname, avatar } = req.body;
        if(!role || !username || !password || !fullname || !avatar) 
            return res.status(400).json({ message: "Properties are required", });
        const duplicate = await User.findOne({ username: username }).exec();
        if(duplicate) return res.sendStatus(409);
        try {
            const result = await User.create({ 
                role,
                username,
                password,
                fullname,
                avatar
            });
            res.status(201).json({ message: "create user success" });
        } catch(error: any) {
            res.status(500).json({ message: error.message })
        }
    }
    public updateUser = async (req: Request, res: Response) => {
        const username: string = req.params.username;
        if(!req.params.username) return res.status(400).json({ message: "Username are required" });
        const user = await User.findOne({ username: req.params.username });
        if(!user) return res.status(204).json({ message: "user not founded" });
        
        if(req.body.username) user.username = req.body.username;
        if(req.body.password) user.password = await bcrypt.hash(req.body.password, 10);
        if(req.body.fullname) user.fullname = req.body.fullname;
        if(req.body.avatar) user.avatar = req.body.avatar;

        const result = await user.save();
        res.status(200).json({
            message: "Success",
        })
    }
    public deleteUser = async (req: Request, res: Response) => {
        if(!req.body.username) return res.status(400).json({ message: "username are required" });
        const user = await User.findOne({ username: req.body.username });
        if(!user) return res.status(204).json({ message: "user not founded" });

        const result = await user.deleteOne();
        res.status(200).json({
            message: "Success",
        })
    }
    public getUserByUsername = async (req: Request, res: Response) => {
        const username: string = req.params.username;
        if(!req.params.username) return res.status(400).json({ message: "Username are required" });
        const user = await User.findOne({ username: username }).exec();
        if(!user) return res.status(204).json({ message: "User not founded", });
        else return res.json({
            id: user._id,
            username: user.username,
            password: user.password,
            fullname: user.fullname,
            avatar: user.avatar
        });
    }
    public updateUserForAdmin = async (req: Request, res: Response) => {
        if(!req.body.username) return res.status(400).json({ message: "username are required" });
        const user = await User.findOne({ username: req.body.username });
        if(!user) return res.status(204).json({ message: "user not founded" });
        
        if(req.body.role) user.role = req.body.role;
        if(req.body.username) user.username = req.body.username;
        if(req.body.password) user.password = await bcrypt.hash(req.body.password, 10);
        if(req.body.fullname) user.fullname = req.body.fullname;
        if(req.body.avatar) user.avatar = req.body.avatar;
        const result = await user.save();
        res.status(200).json({
            message: "Success",
        })
    }
}