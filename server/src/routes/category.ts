import express from "express";
import {
  adminMiddleware,
  authMiddleware,
  requireSignIn,
} from "../middlewares/auth";
import { getCategories, createCategory } from "../controllers/category";
import { runValidation } from "../validators";
import { createCategoryValidator } from "../validators/category";

const routes = express.Router();

routes.get("/", requireSignIn, authMiddleware, getCategories);
routes.post(
  "/",
  createCategoryValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  createCategory
);

export default routes;
