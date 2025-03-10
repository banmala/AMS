import { Router } from "express";
import { getUserData, login, register, getAuthUser } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";

const authRouter = Router();

authRouter.post("/login",asyncHandler(login));
authRouter.post("/register",asyncHandler(register));

export {authRouter};