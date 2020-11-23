import express from "express";
import {
  adminMiddleware,
  requireSignIn,
} from "../middlewares/auth";
import { getTags, createTag, getTag, deleteTag } from "../controllers/Tag";
import { runValidation } from "../validators";
import { createTagValidator } from "../validators/tag";

const router = express.Router();

router.get("/", getTags);
router.get("/:slug", getTag);
router.delete("/:slug", requireSignIn, adminMiddleware, deleteTag);
router.post(
  "/",
  createTagValidator,
  runValidation,
  requireSignIn,
  adminMiddleware,
  createTag
);

export default router;
