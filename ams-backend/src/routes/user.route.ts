import { Router } from "express";
import { getUserData, login, register, getAuthUser } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

const userRouter = Router();

userRouter.get("/authUser", asyncHandler(getAuthUser));
userRouter.get("/:userId", asyncHandler(getUserData));

export {userRouter};