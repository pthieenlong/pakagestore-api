import { Request, Response } from 'express';
import User from '../Model/User';
import bcrypt from 'bcrypt';
import ROLES from '../Config/Roles';

export class RegisterController {
  public register = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({
      message: 'Properties are required',
    })
    const duplicate = await User.findOne({ username: username, }).exec();
    if(duplicate) return res.status(409).json({
      message: 'Duplicate',
    });
    try {
      const hashPassword = await bcrypt.hash(password, 10);
      const result = await User.create({
        role: ROLES.USER,
        username: username,
        password: hashPassword,
      });
      res.status(201).json({
        message: "success",
      })
    } catch(error: any) {
      return res.status(500).json({ message: error.message })
    }
  }
}
