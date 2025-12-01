import { Admin } from "../models/admin.model.js";
import dotenv from "dotenv";

dotenv.config();

async function ensureAdminExist() {
  let admin = await Admin.findOne();

  if (!admin) {
    admin = await Admin.create({
      username: process.env.FIXED_USERNAME,
      password: process.env.FIXED_PASSWORD
    });
  }

  return admin;
}

export const logInAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    const admin = await ensureAdminExist();

    if (username !== admin.username) {
      return res.status(400).json({ message: "Invalid username or password" });
    }

    const match = await admin.comparePassword(password);
    if (!match) {
      return res.status(400).json({ message: "Invalid password" });
    }

    admin.loggedIn = new Date();
    admin.loggedInTime = new Date().toLocaleTimeString();
    await admin.save();

    return res.status(200).json({
      message: "Login successful",
      admin: {
        username: admin.username,
        loggedIn: admin.loggedIn,
        loggedInTime: admin.loggedInTime
      }
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
