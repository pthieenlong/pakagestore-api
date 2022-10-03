import { Request, Response } from 'express';
import User from '../Model/User';
import jwt from "jsonwebtoken";
require("dotenv").config();

const handleRefreshToken = async (req: Request, res: Response) => {
  const cookies = req.cookies;
  if(!cookies?.jwt) return res.sendStatus(401);
  const token = cookies.jwt;
  const foundUser = await User.findOne({ token: token }).exec();
  if(!foundUser) return res.sendStatus(403);
  jwt.verify(
    token,
    <string>process.env.REFRESH_TOKEN_SECRET,
    (err: any, decoded: any) => {
      if(err || foundUser.username !== decoded.username) return res.sendStatus(403);
      const accessToken = jwt.sign(
        {
          UserInfo: {
            username: decoded.username,
            role: foundUser.role
          }
        },
        <string>process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "10m" }
      );
      res.json({ accessToken: accessToken });
    }
  )
}

export default handleRefreshToken;
