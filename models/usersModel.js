import pool from "../config/db.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const insertUser = async (name, email, password) => {
  if (!name || !email || !password) {
    throw new Error("All fields are required");
  }

  if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
    throw new Error("All fields are required");
  }

  if (!validator.isAlphanumeric(name)) {
    throw new Error("Username must be alphanumeric");
  }
  if (!validator.isEmail(email)) {
    throw new Error("Invalid email format");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong enough");
  }

  const [user] = await pool.query("SELECT * FROM tblusers WHERE email = ?", [
    email,
  ]);
  if (user.length === 1) {
    const error = new Error(`Email ${email} is already in use`);
    error.status = 400;
    throw error;
  }

  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  const [result] = await pool.query(
  "INSERT INTO tblusers (name, email, password) VALUES (?, ?, ?)",
  [name, email, hashedPassword]
);

return result;  // This is correct MySQL structure

};



export const loginUser = async (email, password) => {
  if (!email || !password) {
    throw new Error("All fields are required");
  }
    if (email.trim() === "" || password.trim() === "") {
    throw new Error("All fields are required");
    }
    const [user] = await pool.query("SELECT * FROM tblusers WHERE email = ?", [email]);

    if (user.length === 0) {
        const error = new Error("Invalid email or password");
        error.status = 400;
        throw error;
    }

    const token = jwt.sign(
        { id: user[0].id, email: user[0].email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    )
    const isPasswordValid = await bcrypt.compareSync(password, user[0].password);
    if (!isPasswordValid) {
        const error = new Error("Invalid email or password");
        error.status = 400;
        throw error;
    }
    console.log("Generated Token:", token);
    console.log("User ID:", user[0].id);
    return token
}

export default {
  insertUser,
  loginUser
};


export const getUser = async (id) =>{
    const [user] = await pool.query("SELECT * FROM tblusers WHERE id = ?", [id]);
    return user;
}