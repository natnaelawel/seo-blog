import express from "express";
import { getBlogs } from "../controllers/blogs";

// "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node index.ts"
// "dev": "nodemon --exec \"ts-node\" --cache-directory .tscache index.ts"

const routes = express.Router();

routes.get("/", getBlogs);

export default routes;
