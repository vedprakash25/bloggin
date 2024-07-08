const jwt = require("jsonwebtoken");

const generateToken = (userId: string) => {
  // token expire in 30m
  const token = jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30m",
  });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.userId;
  } catch (err) {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
