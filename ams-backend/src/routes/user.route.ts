import { Router } from "express";
import { getUserData, login, register, getAuthUser } from "../services/auth.service";
import { asyncHandler } from "../utils/asyncHandler";
import { deleteUserById, getAllUsers } from "../services/user.service";

const userRouter = Router();

userRouter.get("/authUser", asyncHandler(getAuthUser));
userRouter.get("/", asyncHandler(getAllUsers));
userRouter.get("/:userId", asyncHandler(getUserData));
userRouter.delete("/:userId", asyncHandler(deleteUserById))
export {userRouter};