import { Response, Request } from "express";
const express = require("express");
const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  try {
    res.send("Welcome to the home page!");
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/", (req: Request, res: Response) => {
  res.send("done");
});

module.exports = router;
