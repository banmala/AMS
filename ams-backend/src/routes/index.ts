import { Router } from "express";
import { authRouter } from "./auth.route";
import { musicRouter } from "./music.route";
import { artistRouter } from "./artist.route";
import { runSchemaRouter } from "./runSchema.route";
import authentication from "../middlewares/authentication";
import { asyncHandler } from "../utils/asyncHandler";

const router = Router();

router.use("/auth", authRouter);
router.use(asyncHandler(authentication))
router.use("/music", musicRouter);
router.use("/artist", artistRouter);
router.use("/schema",runSchemaRouter)


export default router;