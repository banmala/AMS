import { Request, Response } from "express";
import { db } from "../db/db";
import { ILogin, IUser } from "../@types/auth.types";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req: Request, res: Response) => {
    
    // First, check if the user already exists
    try {
        const userData: IUser = req.body;
        const password = await bcrypt.hash(userData.password, 10);
        const dob = new Date(userData.dob || "");
        const role = userData.role||"super_admin";
        
        // Check if user already exists
        const [rows]: any = await db.execute("SELECT * FROM user WHERE email = ?", [userData.email]);

        if (Array.isArray(rows) && rows.length > 0) {
            return res.status(400).json({ success: false, message: "User with this email already exists!", data: null });
        }

        // Insert new user
        const [result]: any = await db.execute(
            "INSERT INTO user (first_name, last_name, email, password, phone, dob, role, gender, address) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [userData.first_name, userData.last_name, userData.email, password, userData.phone, dob, role, userData.gender, userData.address]
        );

        return res.status(201).json({ success: true, message: "Successfully created user!", data: result });

    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const login = async (req: Request, res: Response) => {
    try {
        const loginData: ILogin = req.body;
        // Fetch user from database
        const [rows]: any = await db.execute("SELECT * FROM user WHERE email = ?", [loginData.email]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ success: false, message: "User with this email does not exist!", data: null });
        }

        const user = rows[0]; // Get the user object from query result

        // Compare password
        const isMatch = await bcrypt.compare(loginData.password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Incorrect password!", data: null });
        }

        // Generate JWT token
        const token = jwt.sign(
            { data: user },
            process.env.JWT_SECRET as string, // Ensure this exists in .env
            { expiresIn: "1d" }
        );

        return res.status(200).json({ success: true, message: "Login successful!", data: {user,token} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

export {register, login};


