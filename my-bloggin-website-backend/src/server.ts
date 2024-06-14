import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db";
const cors = require("cors");

const app = express();
app.use(cors());
dotenv.config();
connectDB();

const routes = require("./routes");
const loginRoutes = require("./routes/login");
const signupRoutes = require("./routes/signup");

app.use(express.json());

app.use("/", routes);
app.use("/login", loginRoutes);
app.use("/signup", signupRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
