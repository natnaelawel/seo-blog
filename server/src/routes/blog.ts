import express from "express";
import {
  getBlogs,
  createBlog,
  getBlog,
  deleteBlog,
  updateBlog,
  loadMoreBlogs,
  getRelatedBlogs,
  getBlogSearchResult
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

router.get("/search", getBlogSearchResult);
router.get("/:slug", getBlog);

router.get("/", getBlogs);

router.post(
  "/",
  requireSignIn,
  adminMiddleware,
  requireMulterFileUpload.single("file"),
  createBlog
);

router.post(
  "/blogs-categories-tags",
  // requireSignIn,
  // adminMiddleware,
  loadMoreBlogs
);

router.put(
  "/:slug",
  requireSignIn,
  adminMiddleware,
  requireMulterFileUpload.single("file"),
  updateBlog
);

router.delete("/:slug", requireSignIn, adminMiddleware, deleteBlog);

router.get('/:slug/related', getRelatedBlogs )
export default router;

// "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node index.ts"
// "dev": "nodemon --exec \"ts-node\" --cache-directory .tscache index.ts"
