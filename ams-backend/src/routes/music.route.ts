import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createMusic, listMusics } from "../services/music.service";
import { checkAccess } from "../middlewares/authorization";


const musicRouter = Router();

musicRouter.post("/",asyncHandler(checkAccess(["artist"])),asyncHandler(createMusic));
musicRouter.get("/",asyncHandler(listMusics));

export {musicRouter};