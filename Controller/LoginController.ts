import { Request, Response } from 'express';
import User from '../Model/User';
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class LoginController {
  public login = async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if(!username || !password) return res.status(400).json({
      message: "require",
    });
    const user = await User.findOne({ username: username }).exec();
    if(!user) return res.status(409).json({
      message: "Not Exist",
    })
    const matchPassword = await bcrypt.compare(password, user.password);
    if(matchPassword) {
      const accessToken = jwt.sign(
        {
             "UserInfo": {
                username: user.username,
                role: user.role, 
            }
        },
        process.env.ACCESS_TOKEN_SECRET || require('crypto').randomBytes(64).toString('hex'),
        { expiresIn: '10m' }
      );
      const token = jwt.sign(
        { "username": user.username },
        process.env.REFRESH_TOKEN_SECRET || require('crypto').randomBytes(64).toString('hex'),
        { expiresIn: '1d' }
      );
      user.token = token;
      const result = await user.save();

      res.cookie("jwt", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
      res.status(200).json({
        message: "success",
        accessToken
      });
    } else {
      res.status(401).json({
        message: "wrong",
      });
    }
  }
}
