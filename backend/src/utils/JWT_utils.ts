const jwt = require("jsonwebtoken");
const IUser = require("../models/User");
require("dotenv").config({ path: "./src/.env" });

export function GenerateAccsessToken(user: InstanceType<typeof IUser>): string {
  if (!process.env.ACCESS_TOKEN_SECRET) {
    throw new Error(
      "ACCESS_TOKEN_SECRET is not defined in environment variables."
    );
  }
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "5s" });
}
export function GenerateRefreshToken(user: InstanceType<typeof IUser>): string {
  if (!process.env.REFRESH_TOKEN_SECRET) {
    throw new Error(
      "REFRESH_TOKEN_SECRET is not defined in environment variables."
    );
  }
  return jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
}
module.exports = { GenerateAccsessToken };
