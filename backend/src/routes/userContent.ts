import express from "express";
import UserModel from "../models/User";
import { Request, Response } from "express";
const router = express.Router();

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
