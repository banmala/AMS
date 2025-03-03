import { Request, Response } from "express";
import { db } from "../db/db";
import { IMusic } from "../@types/music.types";

const createMusic = async (req: Request, res: Response) => {
    try {
        const musicData: IMusic = req.body;
        
        // Check if artist already exists
        const [rows]: any = await db.execute("SELECT * FROM artist WHERE artist_id = ? AND title = ?", [musicData.artist_id, musicData.title]);

        if (Array.isArray(rows) && rows.length > 0) {
            return res.status(400).json({ success: false, message: "Music with this name and artist already exists!", data: null });
        }

        // Insert new artist
        const [result]: any = await db.execute(
            "INSERT INTO artist (artist_id, title, album_name, genre) VALUES (?,?,?,?)",
            [musicData.artist_id, musicData.title, musicData.album_name, musicData.genre]
        );

        return res.status(201).json({ success: true, message: "Successfully created Music Record!", data: result });

    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};


const listMusics = async (req: Request, res: Response) => {
    try {        
        const [results]: any = await db.execute("SELECT * FROM music");
        return res.status(201).json({ success: true, message: "Successfully fetched musics!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};


export {createMusic, listMusics};


