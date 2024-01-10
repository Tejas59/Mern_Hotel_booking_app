import express, { Request, Response } from "express";
import User from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/register", async (req: Request, res: Response) => {

  
    try {
      let  user = await User.findOne({
        email : req.body.email,
      });
      if (user) {
        return res.status(400).json({ message: "User not found" });
      }
      user = new User(req.body);
      await user.save();

    const token = jwt.sign({userId: user.id },process.env.JWt_SECRET_KEY as string{
        expiresIn: "1d",
    }
    );

    res.cookie("auth_token", token,{
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 86400000,
    })
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "something went wrong" });
    }
  });
  
  export default router;