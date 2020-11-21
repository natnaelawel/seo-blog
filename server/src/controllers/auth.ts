import { Request, Response } from "express";
import Jwt from "jsonwebtoken";
import { NativeError } from "mongoose";
import User from "../models/user";

const secret = process.env.JWT_SECRET || "sample secret";
export const signUp = async (req: Request, res: Response) => {
  let { name, email, password, username } = req.body;
  const secret = process.env.JWT_SECRET || "sample secret";
  username = username.toLowerCase();
  try {
    await User.findOne({ email }).exec(async (_err: NativeError, user) => {
      if (user) {
        return res
          .status(400)
          .json({ error: "User exists with a given email" });
      }
      let profile = `${process.env.CLIENT_URL}/profile/${username}`;
      user = await User.create({
        username,
        name,
        email,
        profile,
        password,
        salt: "",
        role: null
      });
      //   const isMatched = user.authenticate("passw");
      return res.json({ message: "Signup success, please sign in" });

      //   const token = Jwt.sign(
      //     {
      //       name,
      //       email,
      //       password,
      //     },
      //     secret,
      //     { expiresIn: "1hr" }
      //   );
      //   // try {
      //   //     var decoded = jwt.verify(token, 'wrong-secret');
      //   //   } catch(err) {
      //   //     // err
      //   //   }

      //   res.json(`${name} ${email} ${password} ${token}`);
    });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req: Request, res: Response) => {
  let { email, password } = req.body;
  try {
    await User.findOne({ email }).exec(async (_err: NativeError, user) => {
      if (!user) {
        return res.status(400).json({ error: "INVALID email or password" });
      }
      const isMatched = await user.authenticate(password);
      if (!isMatched) {
        return res.status(400).json({ error: "INVALID email or password" });
      }
      const token = Jwt.sign(
        {
          _id: user._id,
          username: user.username,
          email: user.email,
          
        },
        secret,
        { expiresIn: "1d" }
      );

      // res.cookie('token', token, '1d');
      return res
        .status(200)
        .json({ token, user: { username: user.username, email } });

      // try {
      //     var decoded = jwt.verify(token, 'wrong-secret');
      //   } catch(err) {
      //     // err
      //   }
    });
  } catch (error) {
    console.log(error);
  }
};

export const signOut = (_req: Request, res: Response) => {
  res.clearCookie("token");
  res.json({
    message: "Signout Success",
  });
};
