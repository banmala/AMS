import { Router } from "express";


const artistRouter = Router();

artistRouter.get("/", (req,res)=>{
    res.send("List All Artist API Called!!")
});


export {artistRouter};