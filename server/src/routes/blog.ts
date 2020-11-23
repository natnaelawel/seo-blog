import express from "express";
import {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
} from "../controllers/blog";
import {
  adminMiddleware,
  authMiddleware,
  requireSignIn,
} from "../middlewares/auth";
import { requireMulterFileUpload } from "../middlewares/blog";
import { runValidation } from "../validators";
import { createBlogValidator } from "../validators/blog";

const router = express.Router();

router.get("/:slug", getBlog);
router.get("/", getBlogs);
router.post(
  "/",
  requireMulterFileUpload.single("file"),
  requireSignIn,
  adminMiddleware,
  createBlog
);
router.put("/:slug", requireSignIn, adminMiddleware, updateBlog);
router.delete("/:slug", requireSignIn, adminMiddleware, deleteBlog);

export default router;

// "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node index.ts"
// "dev": "nodemon --exec \"ts-node\" --cache-directory .tscache index.ts"
