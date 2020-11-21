import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  encryptPassword: Function;
  authenticate: Function;
  name: String;
  username: String;
  email: String;
  password: string;
  profile: String;
  salt: String;
  // about: String;
  role: any | null ;
  // photo: String;
  // resetPasswordLink: String;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
      unique: true,
      index: true,
      lowercase: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
    },
    email: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32,
      unique: true,
      lowercase: true,
    },
    profile: {
      type: String,
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
    },
    about: {
      type: String,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    photo: {
      type: String,
    },
    resetPasswordLink: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre<IUser>("save", function (next: Function) {
  if (this.password) {
    const salt = bcrypt.genSaltSync(10);
    this.salt = salt;
    this.password = this.encryptPassword(this.password, this.salt);
  }
  next();
});

userSchema.methods.encryptPassword = (
  plainTextPassword: String,
  salt: string | number
) => {
  if (!plainTextPassword) {
    return "";
  } else {
    return bcrypt.hashSync(plainTextPassword, salt);
  }
};

userSchema.methods.authenticate = function (plainTextPassword: string) {
  return bcrypt.compareSync(plainTextPassword, this.password);
};

export default mongoose.model<IUser>("User", userSchema);
