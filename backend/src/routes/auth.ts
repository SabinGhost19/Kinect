const router = require("express").Router;
import { Request, Response } from "express";
const bycriptjs = require("bcryptjs");
const User = require("../models/User");
const { ValidatePassword, HashPassword } = require("../utils/validation");
const {
  GenerateAccsessToken,
  GenerateRefreshToken,
} = require("../utils/JWT_utils");
//sa zicem ca vine in body cu:
// {
//     email:---
//     password:---
// }

router.post("/register", async (req: Request, res: Response) => {
  const is_email = await User.findOne({ email: req.body.email });
  if (is_email) {
    //raspuns ca exista!!!!
  }
  try {
    const hashedPassword = await HashPassword(req.body.password);
    //add to data base....
    //generate user

    const user = new User({
      firsName: req.body.firsName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      profileImage: req.body.profileImage,
      description: req.body.description,
      socialLinks: req.body.socialLinks,
    });

    const savedUser = await user.save();
    //and another code maybe????
    res.send({ user: user._id });
    //
    //res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/login", async (req: Request, res: Response) => {
  try {
    if (await ValidatePassword(req.body.password, req.body.email)) {
      console.log(req.body);
      const accesToken = GenerateAccsessToken(req.body);
      const refreshToken = GenerateRefreshToken(req.body);
      res.json({ accesToken: accesToken, refreshToken: refreshToken });
      //generate de acces token for it
    } else {
      //res.status(403).send("Not Allowed");
    }
  } catch (error) {
    //res.status(500).send();
  }
});
