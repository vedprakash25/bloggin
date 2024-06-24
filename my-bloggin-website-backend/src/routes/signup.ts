var bcrypt = require("bcryptjs");
import User from "../models/userModel";

import express, { Request, Response } from "express";

const signupRoutes = express.Router();

signupRoutes.post("/", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  // Basic validation
  if (!username || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ message: "User already exists", status: 400 });
    }

    // Create a new user
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({ username, password: hashedPassword, email });
    await newUser.save();

    res
      .status(200)
      .json({ message: "User registered successfully!", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = signupRoutes;
