import { Request, Response } from "express";
import Blog, { IBlog } from "../models/blog";
import Category from "../models/category";
import Tag from "../models/tag";
import _, { sortBy } from "lodash";
import stripHtml from "string-strip-html";
import slugify from "slugify";
import { errorHandler } from "../exception/mongodb";
import tag from "../models/tag";

// import multer from "multer";
// const upload = multer({ dest: "src/uploads/" });
// const upload = multer({dest: 'uploads/'});

export const getBlogs = async (_req: Request, res: Response) => {
  try {
    const blogs = await Blog.find()
      .populate([
        {
          path: "categories",
          select: "_id name slug ",
        },
        {
          path: "tags",
          select: "_id name slug ",
        },
        {
          path: "posted_by",
          select: "_id name ",
        },
      ])
      .lean();
    return res.status(200).json(blogs);
  } catch (error) {
    res.json(errorHandler(errorHandler));
  }
};

export const getBlog = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({ slug: slug })
      .populate([
        {
          path: "categories",
          select: "_id name slug ",
        },
        {
          path: "tags",
          select: "_id name slug ",
        },
        {
          path: "posted_by",
          select: "_id name ",
        },
      ])
      .lean();
    return res.status(200).json(blog);
  } catch (error) {
    res.json(error.response.data);
  }
};

export const createBlog = async (req: any, res: Response) => {
  const { title, body, categories, tags } = req.body;
  // console.log('request is ', req)
  if (!title || !title.length) {
    return res.status(400).json({ error: "Title is Required" });
  }
  if (!body || body.length < 200) {
    return res.status(400).json({ error: "Body Content is to0 short" });
  }
  if (!categories || !categories.length) {
    return res.status(400).json({ error: "At least one Category is Required" });
  }
  if (!tags || !tags.length) {
    return res.status(400).json({ error: "At least one Tag is Required" });
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
      blog.categories = categories.split(",");
      blog.tags = tags.split(",");
      blog.photo = req.file.filename;
      blog.slug = slugify(title.toLowerCase());
      blog.excerpt = "";
      blog.meta_title = `${title} | ${process.env.APP_NAME}`;
      const meta_desc: string = stripHtml(body.substring(0, 160)).result;
      console.log(JSON.stringify(meta_desc), "is meta");
      blog.meta_desc = meta_desc;
      blog.posted_by = req.user._id;

      await blog.save();

      return res.json(blog);
    } catch (error) {
      console.log(error, " is error ");
      return res.send(errorHandler(error));
    }
  }
};

export const updateBlog = async (req: any, res: Response) => {
  let slug = req.params.slug;

  let { title, body, categories, tags } = req.body;
  // console.log('request is ', req)
  if (!title || !title.length) {
    return res.status(400).json({ error: "Title is Required" });
  }
  if (!body || body.length < 200) {
    return res.status(400).json({ error: "Body Content is too short" });
  }
  if (!categories || !categories.length) {
    return res.status(400).json({ error: "At least one Category is Required" });
  }
  if (!tags || !tags.length) {
    return res.status(400).json({ error: "At least one Tag is Required" });
  }
  console.log('update data is ', title, body, categories, tags)
  try {
    categories = categories.split(",");
    tags = tags.split(",");
    let excerpt = "";
    let meta_desc = stripHtml(body.substring(0, 160)).result;
    let meta_title = `${title} | ${process.env.APP_NAME}`;
    let photo;
    if (req.file) {
      photo = req.file.filename;
    }
    await Blog.findOne({ slug }).exec(async (err: any, blog: IBlog) => {
      if (err && !blog) {
        return res.status(404).json(err.response.data);
      }
      slug = slugify(title.toLowerCase());

      blog.title = title;
      blog.body = body;
      blog.categories = categories;
      blog.tags = tags;
      if (req.file) {
        blog.photo = req.file.filename;
      }
      blog.slug = slug;
      blog.excerpt = excerpt;
      blog.meta_title = meta_title;
      blog.meta_desc = meta_desc;

      await blog.save();
      return res.json(blog);
    });
  } catch (error) {
    console.log(error, " is error ");
    return res.send(errorHandler(error));
  }
};

export const deleteBlog = async (req: Request, res: Response) => {
  const slug = req.params.slug;

  try {
    await Blog.findOneAndDelete({ slug })
      .orFail()
      .exec(async (err, blog) => {
        if (err && !blog) {
          return res.status(403).json({ error: "No data to remove" });
        }
        res.status(201).json(blog);
      });
  } catch (error) {}
};

export const loadMoreBlogs = async (req: Request, res: Response) => {
  const skip = req.body.skip ? req.body.skip : 0;
  const limit = req.body.limit ? req.body.limit : 10;
  try {
    const [blogs, categories, tags] = await Promise.all([
      Blog.find()
        .populate([
          {
            path: "categories",
            select: "_id name slug ",
          },
          {
            path: "tags",
            select: "_id name slug ",
          },
          {
            path: "posted_by",
            select: "_id name ",
          },
        ])
        .lean()
        .limit(limit)
        .skip(skip)
        .sort({ createdAt: "DESC" }),
      // .sort({'createdAt':'DESC'})
      Category.find(),
      Tag.find(),
    ]);
    return res
      .status(200)
      .json({ blogs, categories, tags, size: blogs.length });
  } catch (error) {
    res.json(errorHandler(errorHandler));
  }
};

export const getRelatedBlogs = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  const limit = req.params.limit ? parseInt(req.params.limit) : 4;
  try {
    await Blog.findOne({ slug: slug }).exec(async (err, blog) => {
      if (err && !blog) {
        return res.status(404).json(err);
      }
      const blogs = await Blog.find({
        _id: { $ne: blog?._id },
        $and: [
          { categories: { $in: blog?.categories } },
          { tags: { $in: blog?.tags } },
        ],
      })
        .populate([
          {
            path: "categories",
            select: "_id name slug ",
          },
          {
            path: "tags",
            select: "_id name slug ",
          },
          {
            path: "posted_by",
            select: "_id name ",
          },
        ])
        .limit(limit)
        .lean();

      return res.status(200).json(blogs);
    });
  } catch (error) {
    res.json(errorHandler(errorHandler));
  }
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
