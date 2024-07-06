import { Response, Request } from "express";
const bcrypt = require("bcryptjs");
import User from "../models/userModel";
const express = require("express");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.send("Welcome to the login page!");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.find({ email });
  const dbHashedPassword = user[0].password;

  try {
    const isAuthenticated = await bcrypt.compare(password, dbHashedPassword);
    console.log(isAuthenticated);
    if (isAuthenticated) {
      return res.json({
        message: "You have login successfully!",
        status: 200,
        data: user[0],
      });
    } else {
      return res.status(400).json({ message: "Credentials not matched!" });
    }
  } catch (error) {
    return res.json({ message: "user not found", status: 500 });
  }
});

module.exports = router;
