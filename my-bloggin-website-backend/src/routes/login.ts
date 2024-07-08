import { Response, Request } from "express";
import User from "../models/userModel";
const { generateToken } = require("../utils/jwt");
const bcrypt = require("bcryptjs");
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
  const userData = {
    email: user[0].email,
    username: user[0].username,
  };

  try {
    const isAuthenticated = await bcrypt.compare(password, dbHashedPassword);
    console.log(isAuthenticated);
    if (isAuthenticated) {
      const token = generateToken(user[0].id);
      res.cookie("wjy", token, {
        httpOnly: true,
      });
      return res.json({
        message: "You have login successfully!",
        status: 200,
        data: userData,
      });
    } else {
      return res.status(400).json({ message: "Credentials not matched!" });
    }
  } catch (error) {
    return res.json({ message: "User not exist!", status: 500 });
  }
});

module.exports = router;
