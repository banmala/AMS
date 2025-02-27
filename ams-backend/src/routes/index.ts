import { Router } from "express";
import { authRouter } from "./auth.route";
import { musicRouter } from "./music.route";
import { artistRouter } from "./artist.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/music", musicRouter);
router.use("/artist", artistRouter);


export default router;