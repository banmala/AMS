import { Router } from "express";
import { authRouter } from "./auth.route";
import { musicRouter } from "./music.route";
import { artistRouter } from "./artist.route";
import { runSchemaRouter } from "./runSchema.route";
import authentication from "../middlewares/authentication";
import { asyncHandler } from "../utils/asyncHandler";
import { userRouter } from "./user.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/schema",runSchemaRouter)
router.use(asyncHandler(authentication))
router.use("/user", userRouter);
router.use("/music", musicRouter);
router.use("/artist", artistRouter);


export default router;