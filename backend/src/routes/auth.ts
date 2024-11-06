const router = require("express").Router;
import { Request, Response } from "express";
import bycriptjs = require("bcryptjs");

//sa zicem ca vine in body cu:
// {
//     email:---
//     password:---
// }
router.post("/login", (req: Request, res: Response) => {
  //call the database
  if (req.body.email == user.email) {
    //verify the hashed password from the db
  }
});
