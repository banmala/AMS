import { Router } from "express";


const authRouter = Router();

authRouter.get("/login", (req,res)=>{
    res.send("Login API Called!!")
});


export {authRouter};