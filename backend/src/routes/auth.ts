import express, { Request, Response } from "express";
import UserModel from "../models/User";
import { GenerateAccessToken, GenerateRefreshToken } from "../utils/JWT_utils";
import { ValidatePassword, HashPassword } from "../utils/validation";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    console.log("Requestul este:", req.body);
    const is_email = await UserModel.findOne({ email: req.body.email });
    if (is_email) {
      res.status(400).send("Email aldready exists!");
      return;
    }

    const hashedPassword = await HashPassword(req.body.password);

    const user = new UserModel({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      profileImage: req.body.profileImage,
      description: req.body.description,
      socialLinks: req.body.socialLinks,
    });

    console.log("Userul creat este: ", user);
    const savedUser = await user.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});
router.post("/login", async (req: Request, res: Response) => {
  try {
    // Verificăm dacă parola este validă pentru utilizatorul dat
    console.log("Aceste este req:.....", req.body);
    const isValidPassword = await ValidatePassword(
      req.body.password,
      req.body.email
    );
    if (isValidPassword) {
      const accesToken = GenerateAccessToken(req.body);
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

export default router;
