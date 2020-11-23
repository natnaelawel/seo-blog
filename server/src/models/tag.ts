import { NextFunction } from "express";
import mongoose, { Document, Schema } from "mongoose";
import slugify from "slugify";

interface ITag extends Document {
  slug: string;
  name: String;
}

const tagSchema: Schema<ITag> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
    },
  },
  { timestamps: true }
);

tagSchema.pre<ITag>("save", function (next: Function) {
  if (this.name) {
    this.slug = slugify(this.name.toString().toLowerCase());
  }
  next();
});
export default mongoose.model("Tag", tagSchema);
