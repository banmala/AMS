import { Request, Response } from "express";
import { db } from "../db/db";
import { IUser } from "../@types/auth.types";
import bcrypt from "bcrypt";

const getAllUsers = async (req: Request, res: Response) => {
    try {
        // Fetch user from database
        const [rows]: any = await db.execute("SELECT id, first_name, last_name, email, phone, dob, gender, role, address FROM user");

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ success: false, message: "User with this id does not exist!", data: null });
        }

        return res.status(200).json({ success: true, message: "Successfully fetched!", data: {users: rows} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
    
}

const getUserData = async (req: Request, res: Response) => {
    try {
        const userId: number = +req.params.userId;
        // Fetch user from database
        const [rows]: any = await db.execute("SELECT * FROM user WHERE id = ?", [userId]);

        if (!Array.isArray(rows) || rows.length === 0) {
            return res.status(400).json({ success: false, message: "User with this id does not exist!", data: null });
        }

        const user = rows[0]; // Get the user object from query result

        return res.status(200).json({ success: true, message: "Successfully fetched!", data: {user} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
    
}

const deleteUserById = async (req: Request, res: Response) => {
    try {
        const userId: number = +req.params.userId;
        // Fetch user from database
        const [rows]: any = await db.execute("DELETE FROM user WHERE id = ?", [userId]);
        if (rows.affectedRows = 0) {
            return res.status(400).json({ success: false, message: "User with this id does not exist!", data: null });
        }

        const user = rows[0]; // Get the user object from query result

        return res.status(200).json({ success: true, message: "Successfully deleted user!", data: {user} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
    
}


const updateUser = async (req: Request, res: Response) => {
    
    // First, check if the user already exists
    try {
        const userId: number = +req.params.userId;
        const userData: IUser = req.body;
        const password = await bcrypt.hash(userData.password, 10);
        const dob = new Date(userData.dob || "");
        const role = userData.role||"super_admin";
        
        // Check if user already exists
        const [rows]: any = await db.execute("SELECT * FROM user WHERE id = ?", [userId]);

        if (Array.isArray(rows) && rows.length == 0) {
            return res.status(400).json({ success: false, message: "User with this email already exists!", data: null });
        }

        // Insert new user
        const [result]: any = await db.execute(
            "UPDATE user set first_name = ?,last_name = ?,email = ?,password = ?,phone = ?,dob = ?,role = ?,gender = ?,address = ? WHERE id = ?",
            [userData.first_name, userData.last_name, userData.email, password, userData.phone, dob, role, userData.gender, userData.address, userId]
        );

        return res.status(201).json({ success: true, message: "Successfully updated user!", data: result });

    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

export {getUserData, getAllUsers, deleteUserById, updateUser};


