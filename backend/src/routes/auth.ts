// const router = require("express").Router();
// import { Request, Response } from "express";
// const User = require("../models/User");
// const { ValidatePassword, HashPassword } = require("../utils/validation");
// const {
//   GenerateAccsessToken,
//   GenerateRefreshToken,
// } = require("../utils/JWT_utils");

// router.post("/register", async (req: Request, res: Response) => {
//   const is_email = await User.findOne({ email: req.body.email });
//   if (is_email) {
//     //raspuns ca exista!!!!
//     res.status(400).send("Email exists");
//   }
//   try {
//     const hashedPassword = await HashPassword(req.body.password);
//     //add to data base....
//     //generate user

//     const user = new User({
//       firsName: req.body.firsName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: hashedPassword,
//       profileImage: req.body.profileImage,
//       description: req.body.description,
//       socialLinks: req.body.socialLinks,
//     });

//     const savedUser = await user.save();
//     //and another code maybe????
//     //res.status(200).send({ user: user._id });
//     //
//     res.status(201).json({ message: "User created successfully", user });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

// router.post("/login", async (req: Request, res: Response) => {
//   try {
//     if (await ValidatePassword(req.body.password, req.body.email)) {
//       console.log(req.body);
//       const accesToken = GenerateAccsessToken(req.body);
//       const refreshToken = GenerateRefreshToken(req.body);
//       res.json({ accesToken: accesToken, refreshToken: refreshToken });
//     } else {
//       res.status(403).send("Not Allowed");
//     }
//   } catch (error) {
//     res.status(500).send();
//   }
// });

// export default router;

import express, { Request, Response } from "express";
import User from "../models/User";
import { GenerateAccsessToken, GenerateRefreshToken } from "../utils/JWT_utils";
import { ValidatePassword, HashPassword } from "../utils/validation";

const router = express.Router();

// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     // Verificăm dacă email-ul există deja în baza de date
//     const is_email = await User.findOne({ email: req.body.email });
//     if (is_email) {
//       return res.status(400).send("Email already exists");
//     }

//     // Generăm parola hash-uită
//     const hashedPassword = await HashPassword(req.body.password);

//     // Cream utilizatorul pe baza datelor din request
//     const user = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: hashedPassword,
//       profileImage: req.body.profileImage,
//       description: req.body.description,
//       socialLinks: req.body.socialLinks,
//     });

//     // Salvăm utilizatorul în baza de date
//     const savedUser = await user.save();

//     // Răspundem cu succes
//     res
//       .status(201)
//       .json({ message: "User created successfully", user: savedUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

router.post("/login", async (req: Request, res: Response) => {
  try {
    // Verificăm dacă parola este validă pentru utilizatorul dat
    const isValidPassword = await ValidatePassword(
      req.body.password,
      req.body.email
    );
    if (isValidPassword) {
      const accesToken = GenerateAccsessToken(req.body);
      const refreshToken = GenerateRefreshToken(req.body);
      res.json({ accesToken: accesToken, refreshToken: refreshToken });
    } else {
      res.status(403).send("Not Allowed");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send();
  }
});

// router.post("/register", async (req: Request, res: Response) => {
//   try {
//     // Verificăm dacă email-ul există deja în baza de date
//     const is_email = await User.findOne({ email: req.body.email });
//     if (is_email) {
//       return res.status(400).send("Email already exists");
//     }

//     // Generăm parola hash-uită
//     const hashedPassword = await HashPassword(req.body.password);

//     // Cream utilizatorul pe baza datelor din request
//     const user = new User({
//       firstName: req.body.firstName,
//       lastName: req.body.lastName,
//       email: req.body.email,
//       password: hashedPassword,
//       profileImage: req.body.profileImage,
//       description: req.body.description,
//       socialLinks: req.body.socialLinks,
//     });

//     // Salvăm utilizatorul în baza de date
//     const savedUser = await user.save();

//     // Răspundem cu succes
//     res
//       .status(201)
//       .json({ message: "User created successfully", user: savedUser });
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ message: "Internal server error" });
//   }
// });

export default router;
