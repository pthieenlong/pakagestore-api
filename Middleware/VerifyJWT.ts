import * as express from "express";
import jwt from "jsonwebtoken";
require('dotenv').config();

const verifyJWT = (req: any, res: express.Response, next: any) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if(!authHeader?.startsWith('Bearer ')) return res.sendStatus(401);
    const token = authHeader.split(' ')[1];
    jwt.verify(
        token,
        <string>process.env.ACCESS_TOKEN_SECRET,
        (err: unknown, decoded: any) => {
            if(err) return res.sendStatus(403);
            req.username = decoded.UserInfo.username;
            req.role = decoded.UserInfo.role;
            next();
        }
    )
}

export default verifyJWT;