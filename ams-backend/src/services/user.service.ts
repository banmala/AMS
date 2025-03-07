import { Request, Response } from "express";
import { db } from "../db/db";


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


export {getUserData, getAllUsers, deleteUserById};


