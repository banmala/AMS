import { NextFunction, Request, Response } from "express";

const checkAccess = (requiredRoles: string[]) => {
    return (req:Request, res:Response, next:NextFunction) => {
        const user = req.body.user
        if(requiredRoles.length==0){
            next()
        }
        if (requiredRoles.includes(user.role)) {
            next();
        } else {
            return res.status(401).json({ success: false, message: "You are not allowed to access this resources!", data: null });
        }
    }
}

export { checkAccess }
