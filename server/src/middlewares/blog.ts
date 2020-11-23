import { NextFunction, Request, Response } from "express";
import { indexOf } from "lodash";
import multer from "multer";

export const requireMulterFileUpload = multer({
  storage: multer.diskStorage({
    filename: (_req, file, cb) => {
      const file_extn = file.mimetype.substring(6);
      const filename = file.originalname.toString().substring(0, file.originalname.lastIndexOf('.'))+'-'
      cb(
        null,
        filename +
          Date.now() +
          `.${file_extn}`
      );
    },
    destination: "public/uploads/",
  })
});

