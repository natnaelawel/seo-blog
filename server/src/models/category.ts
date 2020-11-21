import { NextFunction } from "express";
import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

export interface ICategory extends Document {
  name: String;
  slug: String;
}

const categorySchema: Schema<ICategory> = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
      unique: true, 
      trim: true, 
      max: 32
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true }
);

categorySchema.pre<ICategory>("save", function (next: Function) {
  if (this.name) {
      this.slug = slugify(this.name.toString().toLowerCase())
  }
  next();
});

export default mongoose.model("Category", categorySchema);
