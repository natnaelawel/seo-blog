import express from "express";
import { signUp, signIn, signOut } from "../controllers/auth";
import { runValidation } from "../validators";
import { requireSignIn } from "../middlewares/auth";
import { userSignInValidator, userSignUpValidator } from "../validators/auth";

// "dev": "nodemon --watch 'src/**/*.ts' --exec ts-node index.ts"
// "dev": "nodemon --exec \"ts-node\" --cache-directory .tscache index.ts"

const routes = express.Router();

routes.post("/signup", userSignUpValidator, runValidation, signUp);
routes.post("/signin", userSignInValidator, runValidation, signIn);
routes.get("/signout", signOut)
routes.get("/secretpage",requireSignIn, (req:any, res:any)=>{
    res.json({
        message: 'Access Granted!',
        user: req.user
    })
})

export default routes;
