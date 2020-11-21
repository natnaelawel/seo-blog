import { Request, Response } from "express";
import { errorHandler } from "../exception/mongodb";
import Category from "../models/category";
export const getCategories =async (req: Request, res: Response) => {
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
    
    res.status(403).json(errorHandler(error));
  }
};
