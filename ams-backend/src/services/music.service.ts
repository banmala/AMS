import { Request, Response } from "express";
import { db } from "../db/db";
import { IMusic } from "../@types/music.types";

const createMusic = async (req: Request, res: Response) => {
    try {
        const musicData: IMusic = req.body;
        // Check if music already exists
        const [rows]: any = await db.execute("SELECT * FROM music WHERE title = ?", [musicData.title]);
        if (Array.isArray(rows) && rows.length > 0) {
            return res.status(400).json({ success: false, message: "Music with this title already exists!", data: null });
        }
        // Insert new music
        const [result]: any = await db.execute(
            "INSERT INTO music (artist_id, title, album_name, genre) VALUES (?,?,?,?)",
            [musicData.artist_id,musicData.title,musicData.album_name,musicData.genre]
        );
        return res.status(201).json({ success: true, message: "Successfully created music!", data: result });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const listMusics = async (req: Request, res: Response) => {
    try {        
        const [results]: any = await db.execute("SELECT id, artist_id, title, album_name, genre FROM music");
        return res.status(201).json({ success: true, message: "Successfully fetched musics!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const getMusics = async (req: Request, res: Response) => {
    try {        
        const musicId: number = +req.params.musicId;
        const [results]: any = await db.execute("SELECT id, artist_id, title, album_name, genre FROM music WHERE id=?",[musicId]);
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(400).json({ success: false, message: "Music with given id does not exist!", data: null });
        }
        return res.status(201).json({ success: true, message: "Successfully fetched musics!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const getMusicsByArtist = async (req: Request, res: Response) => {
    try {        
        const artistId: number = +req.params.artistId;
        const [results]: any = await db.execute("SELECT id, artist_id, title, album_name, genre FROM music WHERE artist_id=?",[artistId]);
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(400).json({ success: false, message: "Music with given id does not exist!", data: null });
        }
        return res.status(201).json({ success: true, message: "Successfully fetched musics!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const updateMusic = async (req: Request, res: Response) => {
    try {
        const musicData: IMusic = req.body;
        const musicId: number = +req.params.musicId;
        // Check if music already exists
        const [rows]: any = await db.execute("SELECT * FROM music WHERE title = ?", [musicData.title]);
        if (Array.isArray(rows) && rows.length == 0) {
            return res.status(400).json({ success: false, message: "Music with this title doesnot exists!", data: null });
        }
        // Insert new music
        const [result]: any = await db.execute(
            "UPDATE music set  title= ?, artist_id= ?, album_name= ?, genre= ? WHERE id = ?",[musicData.title, musicData.artist_id, musicData.album_name, musicData.genre, musicId]
        );
        return res.status(201).json({ success: true, message: "Successfully updated music!", data: result });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const deleteMusicById = async (req: Request, res: Response) => {
    try {
        const musicId: number = +req.params.musicId;
        // Fetch music from database
        const [rows]: any = await db.execute("DELETE FROM music WHERE id = ?", [musicId]);
        if (rows.affectedRows = 0) {
            return res.status(400).json({ success: false, message: "Music with this id does not exist!", data: null });
        }

        const music = rows[0]; // Get the music object from query result

        return res.status(200).json({ success: true, message: "Successfully deleted music!", data: {music} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
    
}

export {createMusic, listMusics, getMusics, updateMusic, deleteMusicById, getMusicsByArtist};