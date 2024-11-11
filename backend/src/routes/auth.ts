import express, { Request, Response } from "express";
import UserModel from "../models/User";
import { GenerateAccessToken, GenerateRefreshToken } from "../utils/JWT_utils";
import { ValidatePassword, HashPassword } from "../utils/validation";
import jwt, { JwtPayload, VerifyErrors } from "jsonwebtoken";

const router = express.Router();

router.post("/refresh", async (req: Request, res: Response) => {
  const { token } = req.body;
  console.log("TOKEN REF VENIT:", token);
  if (!token) {
    res
      .status(401)
      .json({ message: "Cannot get refresh token from the request body." });
    return;
  }

  try {
    // Find user with matching refresh token
    const user = await UserModel.findOne({ refreshToken: token });
    if (!user) {
      console.log("USER NEGSIT");
      res.status(403).json({ message: "Invalid refresh token." });
      return;
    }

    // Verify the refresh token
    jwt.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET as string,
      (
        error: VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        if (error || !decoded || typeof decoded === "string") {
          res.status(403).json({ message: "Failed to verify refresh token." });
          return;
        }

        // Generate a new access token if verification is successful
        const accessToken = GenerateAccessToken(decoded);
        console.log("Sending new access token.");
        res.status(200).json({ accessToken });
        return;
      }
    );
  } catch (error) {
    console.error("Error while refreshing token:", error);
    res.status(500).json({ message: "Internal server error." });
    return;
  }
});
router.post("/register", async (req: Request, res: Response) => {
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

    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      console.log("Email nevalid, USER NEEXISTENT...");
      res.status(403).send("Not Allowed");
      return;
    }
    console.log("Aceste este req:.....", req.body);
    const isValidPassword = await ValidatePassword(
      req.body.password,
      req.body.email
    );
    if (isValidPassword) {
      const accesToken = GenerateAccessToken(req.body);
      const refreshToken = GenerateRefreshToken(req.body);

      //actualiza userul si adaugam refreshtokenul corecpunzator
      user.refreshToken.push(refreshToken);
      await user.save();
      res
        .status(200)
        .json({ accesToken: accesToken, refreshToken: refreshToken });
    } else {
      console.log("Email si parola nevalida, USER NEEXISTENT...");
      res.status(403).send("Not Allowed");
    }
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send();
  }
});

export default router;
