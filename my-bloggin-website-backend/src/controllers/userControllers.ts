import { Request, Response } from "express";
import User from "../models/userModel";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find({
      email: "ved@gmai.com",
      password: "12345678",
    });
    res.json(users);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};
