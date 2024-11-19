import express from "express";
import UserModel from "../models/User";
import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
const router = express.Router();
import { AuthenticatedRequest } from "../utils/JWT_utils";
import { upload } from "../index";

router.post(
  "/uploadProfile",
  upload.single("image"),
  async (req: AuthenticatedRequest, res: Response) => {
    try {
      const userEmail = req.user?.email;

      if (!userEmail) {
        res.status(400).json({ message: "User email is required" });
        return;
      }

      const user = await UserModel.findOne({ email: userEmail });
      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      if (req.file && req.file.mimetype.startsWith("image/")) {
        const base64Image = req.file.buffer.toString("base64");
        user.profileImage = base64Image;
        await user.save();

        console.log("Priof saved succef....");
        res
          .status(200)
          .json({ message: "Profile image uploaded successfully" });
      } else {
        res.status(400).json({ message: "No image provided" });
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
router.get("/profile", async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userEmail = req.user?.email;
    console.log("\n\nUSER+ID:", userEmail);
    if (!userEmail) {
      res
        .status(400)
        .json({ message: "Id not defined in the request params!" });
      return;
    }

    const user = await UserModel.find({ email: userEmail });
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    console.log("USER:", user);
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/all_data/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    //verify if the id is in the body and if itsnot undefined
    if (!id) {
      res
        .status(400)
        .json({ message: "Id not defined in the request params!" });
      return;
    }

    const user = await UserModel.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    //if is found response with all his data:
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
