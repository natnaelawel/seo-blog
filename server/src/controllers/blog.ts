import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import Category from "../models/category";
import Tag from "../models/tag";
import _ from "lodash";
import stripHtml from "string-strip-html";
import slugify from "slugify";
import { errorHandler } from "../exception/mongodb";

// import multer from "multer";
// const upload = multer({ dest: "src/uploads/" });
// const upload = multer({dest: 'uploads/'});

export const getBlogs = (_req: Request, res: Response) => {
  res.json({ message: "Blogs" });
};

export const getBlog = (_req: Request, res: Response) => {
  res.json({ message: "Blogs" });
};

export const createBlog = async (req: any, res: Response) => {
  const { title, body, categories, tags } = req.body;
  // console.log('request is ', req)
  if(!title || !title.length){
    return res.status(400).json({error: 'Title is Required'})
  }
  if(!body || body.length < 200){
    return res.status(400).json({error: 'Body Content is to0 short'})
  }
  if(!categories || !categories.length){
    return res.status(400).json({error: 'At least one Category is Required'})
  }
  if(!tags || !tags.length){
    return res.status(400).json({error: 'At least one Tag is Required'})
  }
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    try {
      const blog: IBlog = new Blog();
      blog.title = title;
      blog.body = body;
      blog.categories =  categories.split(",");
      blog.tags = tags.split(",");
      blog.photo = req.file.filename;
      blog.slug = slugify(title.toLowerCase());
      blog.excerpt = ""
      blog.meta_title = `${title} | ${process.env.APP_NAME}`;
      const meta_desc:string = stripHtml(body.substring(0,160)).result;
      console.log(JSON.stringify(meta_desc), 'is meta')
      blog.meta_desc = meta_desc
      blog.posted_by = req.user._id;

      await blog.save();

      return res.json(blog);
    } catch (error) {
      console.log(error, ' is error ')
      return res.send( errorHandler(error));
    }
  }
};

export const updateBlog = (_req: Request, res: Response) => {
  res.json({ message: "Blogs" });
};

export const deleteBlog = (_req: Request, res: Response) => {
  res.json({ message: "Blogs" });
};



// const host = req.url;
// console.log(req.file.originalname)
// console.log(req.file.fieldname)
// console.log(req.file.mimetype)
// console.log(JSON.stringify(req.file))
// console.log(req.originalUrl)
// console.log(req.hostname)
// console.log(req.)
// const filePath = req.protocol + req.url + '/' + req.file.path;
// const blog = await Blog.create({})
// console.log(filePath, "is filePath")

// {
//     "compilerOptions": {
//         "module": "commonjs",
//         "esModuleInterop": true,
//         "allowSyntheticDefaultImports": true,
//         "target": "es6",
//         "noImplicitAny": true,
//         "moduleResolution": "node",
//         "sourceMap": true,
//         "outDir": "dist",
//         "baseUrl": ".",
//         "paths": {
//             "*": [
//                 "node_modules/*",
//                 "src/types/*"
//             ]
//         }
//     },
//     "include": [
//         "src/**/*",
//         "next-env.d.ts",
//         "src/**/*.ts",
//         "src/**/*.tsx"
//     ]
// }
