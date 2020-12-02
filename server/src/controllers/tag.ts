import { Request, Response } from "express";
import { errorHandler } from "../exception/mongodb";
import Blog, { IBlog } from "../models/blog";
import Tag from "../models/tag";

export const getTag = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const tag = await Tag.findOne({ slug });
    if (!tag) {
      return res.status(404).json({
        message: "Tag is not found",
      });
    }
    res.status(201).json(tag);
  } catch (error) {
    res.status(500).json({ message: "There is an error" });
  }
};

export const getTags = async (_req: Request, res: Response) => {
  try {
    await Tag.find().exec((err, tags) => {
      if (!tags) {
        return res.status(404).json({
          message: "Tag is not found",
        });
      }
      res.status(200).json(tags);
    });
  } catch (error) {}
};

export const getTagBlogs = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    await Tag.findOne({ slug: slug }).exec(async (err, tag) => {
      if (err && !tag) {
        res.status(404).json(err);
      }
      const blogs: IBlog[] = await Blog.find({
        tags: tag?._id,
      }).populate([
        { path: "categories", select: "_id name slug " },
        { path: "tags", select: "_id name slug " },
      ])
      // .select('-body');
      
      return res.status(200).json({ tag, blogs });
    });
  } catch (error) {}
};

export const createTag = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const tag = await Tag.create({ name });
    res.status(201).json(tag);
  } catch (error) {
    res.status(403).json({error: errorHandler(error)});
  }
};

export const deleteTag = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    await Tag.findOneAndDelete({ slug }).exec((err, tag) => {
      if (!tag) {
        return res.status(404).json({ message: "No data to remove" });
      }
      res.status(200).json(tag);
    });
  } catch (error) {
    res.status(500).json({ message: "There is an error" });
  }
};
