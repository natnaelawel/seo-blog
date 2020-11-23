import { check, body } from "express-validator";

export const createBlogValidator = [
  body("title").notEmpty().withMessage("Title is Required!"),
  check("body").notEmpty().withMessage("Body is Required!"),
  check("tags").notEmpty().withMessage("Tag is Required!"),
  check("categories").notEmpty().withMessage("Category is Required!"),
  //   check("title").notEmpty().withMessage("Name is Required!"),
];
