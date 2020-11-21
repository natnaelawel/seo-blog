import express from "express";
import { adminMiddleware, authMiddleware, requireSignIn } from "../middlewares/auth";
import { getUser } from "../middlewares/user";
import { userSignInValidator, userSignUpValidator } from "../validators/auth";

const routes = express.Router();

routes.get("/profile",requireSignIn, authMiddleware, getUser);

export default routes;
