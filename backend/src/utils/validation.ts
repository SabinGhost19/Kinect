import bcryptjs from "bcryptjs";
const User = require("../models/User");

export async function HashPassword(password: string): Promise<string> {
  try {
    const salt = await bcryptjs.genSalt();
    const hashedPassword = await bcryptjs.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    return "";
  }
}

export async function ValidatePassword(
  password: string,
  email: string
): Promise<boolean> {
  try {
    const user = await User.findOne({ email });

    // if user exist and password is valid return  true
    if (user && (await bcryptjs.compare(password, user.password))) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error comparing the passwords:", error);
    return false;
  }
}
module.exports = { HashPassword, ValidatePassword };
