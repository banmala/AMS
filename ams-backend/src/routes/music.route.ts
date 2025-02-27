import { Router } from "express";


const musicRouter = Router();

musicRouter.get("/", (req,res)=>{
    res.send("List All Music API Called!!")
});


export {musicRouter};