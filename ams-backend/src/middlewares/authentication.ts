import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

const authentication = (req:Request, res:Response, next:NextFunction) => {
    const authToken = req.headers.authorization
    const token = authToken?.split(" ")[1]
    if(!token){
        return res.status(401).json({ success: false, message: "Only logged in user can access this resource!", data: null });
    }
    jwt.verify(token, process.env.JWT_SECRET as string, async (error, decoded:any) => {
        if (error) {
            return res.status(401).json({ success: false, message: error.message, data: null });
        } else {
            req.body.user = decoded.data;
            next();
        }
    });
    

}


export default authentication;