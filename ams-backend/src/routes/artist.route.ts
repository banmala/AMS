import { Router } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { createArtist, deleteArtistById, getArtists, listArtists, updateArtist } from "../services/artist.service";
import { checkAccess } from "../middlewares/authorization";

const artistRouter = Router();

artistRouter.post("/",asyncHandler(checkAccess(["artist_manager","super_admin"])), asyncHandler(createArtist));
artistRouter.get("/:artistId", asyncHandler(getArtists));
artistRouter.get("/", asyncHandler(listArtists));
artistRouter.delete("/:artistId", asyncHandler(deleteArtistById));
artistRouter.put("/:artistId", asyncHandler(updateArtist));

export {artistRouter};