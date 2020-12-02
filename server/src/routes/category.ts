import express from "express";
import {
  adminMiddleware,
  authMiddleware,
  requireSignIn,
} from "../middlewares/auth";
import { getCategories, createCategory, getCategory, deleteCategory, getCategoryBlogs } from "../controllers/category";
import { runValidation } from "../validators";
import { createCategoryValidator } from "../validators/category";

const router = express.Router();

router.get("/", getCategories);
router.get("/:slug", getCategory);
router.get("/:slug/blogs", getCategoryBlogs);
router.delete("/:slug", requireSignIn, adminMiddleware, deleteCategory);
router.post(
  "/",
  createCategoryValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  createCategory
);

export default router;
