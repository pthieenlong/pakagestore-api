import { Request, Response } from "express";
import ROLES from "../Config/Roles";
const verifyRole = (...allowedRoles: Array<ROLES>) => {
    return (req: any, res: Response, next: any) => {
        const roles = [...allowedRoles];
        if(!req?.role) return res.sendStatus(401);
        const result = roles.find((role: ROLES) => role === req.role);
        if(!result) return res.sendStatus(401);
        next();
    }
}
export default verifyRole;