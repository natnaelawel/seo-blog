import { NextFunction } from "express";
import mongoose, { Document, Mongoose, Schema } from "mongoose";
import slugify from "slugify";
const objectId = mongoose.Types.ObjectId
export interface IBlog extends Document {
  title: String;
  slug: String;
  body: String, 
  categories: mongoose.Types.ObjectId[], 
  tags:  mongoose.Types.ObjectId[],
  photo: String,
  excerpt: String, 
  meta_title: String,   
  meta_desc: String, 
  posted_by: mongoose.Types.ObjectId
}

const blogSchema: Schema<IBlog> = new mongoose.Schema<IBlog>(
  {
    title: {
      type: String,
      required: true,
      unique: true, 
      trim: true, 
      min: 3, 
      max: 160
    },
    slug: {
      type: String,
      unique: true,
      index: true, 
    },
    body: {
        type: {}, 
        min: 100,
        max: 2040000 
    }, 
    excerpt: {
        type: String, 
        max: 1000
    }, 
    meta_title: {
        type: String,
    }, 
    meta_desc: {
        type: String
    }, 
    photo: {
        type: String, 
    }, 
    categories: {
        type: [{type: objectId, ref: 'Category', required: true}]
    }, 
    tags: {
        type: [{type: objectId, ref: 'Tag', required: true}]
    }, 
    posted_by:{
        type: objectId, 
        ref: 'User'
    }
  },
  { timestamps: true }
);


export default mongoose.model<IBlog>("Blog", blogSchema);
