import { Request, Response } from "express";
import { errorHandler } from "../exception/mongodb";
import Category from "../models/category";

export const getCategory = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const category = await Category.findOne({ slug });
    res.status(200).json(category);
  } catch (error) {
    res.status(404).json(error);
  }
};
export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(404).json(error);
  }
};

export const createCategory = async (req: Request, res: Response) => {
  const name = req.body.name;
  try {
    const category = await Category.create({
      name,
    });

    res.status(201).json({ category });
  } catch (error) {
    res.status(403).json({error: errorHandler(error)});
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    await Category.findOneAndDelete({ slug }).exec(async (err, category) => {
      if (err && !category) {
        return res.status(403).json({ error: "No data to remove" });
      }
      res.status(201).json(category);
    });
  } catch (error) {}
};
