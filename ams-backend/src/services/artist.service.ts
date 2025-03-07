import { Request, Response } from "express";
import { db } from "../db/db";
import { IArtist } from "../@types/artist.types";

const createArtist = async (req: Request, res: Response) => {
    try {
        const artistData: IArtist = req.body;
        const dob = new Date(artistData.dob || "");
        // Check if artist already exists
        const [rows]: any = await db.execute("SELECT * FROM artist WHERE name = ?", [artistData.name]);
        if (Array.isArray(rows) && rows.length > 0) {
            return res.status(400).json({ success: false, message: "Artist with this name already exists!", data: null });
        }
        // Insert new artist
        const [result]: any = await db.execute(
            "INSERT INTO artist (name, dob, gender, address, first_release_year, no_of_albums_released) VALUES (?,?,?,?,?,?)",
            [artistData.name, dob, artistData.gender, artistData.address, artistData.first_release_year, artistData.no_of_albums_released]
        );
        return res.status(201).json({ success: true, message: "Successfully created artist!", data: result });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const listArtists = async (req: Request, res: Response) => {
    try {        
        const [results]: any = await db.execute("SELECT * FROM artist");
        return res.status(201).json({ success: true, message: "Successfully fetched artists!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const getArtists = async (req: Request, res: Response) => {
    try {        
        const artistId: number = +req.params.artistId;
        const [results]: any = await db.execute("SELECT * FROM artist WHERE id=?",[artistId]);
        if (!Array.isArray(results) || results.length === 0) {
            return res.status(400).json({ success: false, message: "Artist with given id does not exist!", data: null });
        }
        return res.status(201).json({ success: true, message: "Successfully fetched artists!", data: results });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const updateArtist = async (req: Request, res: Response) => {
    try {
        const artistData: IArtist = req.body;
        const artistId: number = +req.params.artistId;
        const dob = new Date(artistData.dob || "");
        // Check if artist already exists
        const [rows]: any = await db.execute("SELECT * FROM artist WHERE name = ?", [artistData.name]);
        if (Array.isArray(rows) && rows.length == 0) {
            return res.status(400).json({ success: false, message: "Artist with this name doesnot exists!", data: null });
        }
        // Insert new artist
        const [result]: any = await db.execute(
            "UPDATE artist set  name= ?, dob= ?, gender= ?, address= ?, first_release_year= ?, no_of_albums_released= ? WHERE id = ?",[artistData.name, dob, artistData.gender, artistData.address, artistData.first_release_year, artistData.no_of_albums_released, artistId]
        );
        return res.status(201).json({ success: true, message: "Successfully updated artist!", data: result });
    } catch (error: any) {
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
};

const deleteArtistById = async (req: Request, res: Response) => {
    try {
        const artistId: number = +req.params.artistId;
        // Fetch artist from database
        const [rows]: any = await db.execute("DELETE FROM artist WHERE id = ?", [artistId]);
        if (rows.affectedRows = 0) {
            return res.status(400).json({ success: false, message: "Artist with this id does not exist!", data: null });
        }

        const artist = rows[0]; // Get the artist object from query result

        return res.status(200).json({ success: true, message: "Successfully deleted artist!", data: {artist} });
    } catch (error: any) {
        console.error("Login Error:", error);
        return res.status(500).json({ success: false, message: error.message || "Internal Server Error", data: null });
    }
    
}

export {createArtist, listArtists, getArtists, updateArtist, deleteArtistById};


