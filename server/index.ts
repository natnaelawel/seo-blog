import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import blogRoutes from "./src/routes/blog";
import authRoutes from "./src/routes/auth";
import userRoutes from "./src/routes/user";
import categoryRoutes from "./src/routes/category";
import tagRoutes from './src/routes/tag';
import path from "path";

dotenv.config();
console.log(__dirname, 'is directory name')

const app = express();
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
// app.use(express.static(__dirname, 'public'))
const path_name:string = path.join(__dirname, './public');
console.log(path_name);
app.use(express.static(path_name))
// app.use('/_next', express.static(path.join(__dirname, '../.next')))



const PORT = process.env.PORT || 8383;
const DATABASE_URI =
  process.env.DATABASE_URI || "mongodb://localhost:27017/seo_blog";
mongoose
  .connect(DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server is running... http://localhost:${PORT}`)
    );
  })
  .catch((err) => console.log("There is an error on connecting", err));

  app.use("/api/blogs/", blogRoutes);
  app.use("/api/user/", userRoutes);
  app.use("/api/categories/", categoryRoutes);
  app.use("/api/tags/", tagRoutes);
  app.use("/api", authRoutes);
  app.use("/", (_req, res) => res.json({ message: "🚀🚀 Hello World!" }));
