import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createMusic, deleteMusicById, getMusics, getMusicsByArtist, listMusics, updateMusic } from "../services/music.service";
import { checkAccess } from "../middlewares/authorization";


const musicRouter = Router();

musicRouter.post("/",asyncHandler(checkAccess([])),asyncHandler(createMusic));
musicRouter.get("/:musicId", asyncHandler(getMusics));
musicRouter.get("/", asyncHandler(listMusics));
musicRouter.delete("/:musicId", asyncHandler(deleteMusicById));
musicRouter.put("/:musicId", asyncHandler(updateMusic));
musicRouter.get("/artist/:artistId", asyncHandler(getMusicsByArtist));

export {musicRouter};