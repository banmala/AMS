import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createArtist, listArtists } from "../services/artist.service";
import { checkAccess } from "../middlewares/authorization";

const artistRouter = Router();

artistRouter.post("/",asyncHandler(checkAccess(["artist_manager"])), asyncHandler(createArtist));
artistRouter.get("/", asyncHandler(listArtists));

export {artistRouter};