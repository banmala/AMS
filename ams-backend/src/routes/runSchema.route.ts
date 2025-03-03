import { Router } from "express";
import { db } from "../db/db";
import path from "path";
import fs from "fs";

const runSchemaRouter = Router();

runSchemaRouter.get("/runSchema",async (req,res)=>{
    try{
        const sqlFilePath = path.join(__dirname, "/../db/schema.sql");
        const sqlQuery = fs.readFileSync(sqlFilePath, "utf8");
        const queries  = sqlQuery.split(";")
        queries.forEach(async (query)=>{
            const [result] = await db.execute(query,);
            console.log("result: ", result);
        })
        res.send("Successfully Executed Schema!");
    } catch (error) { 
        console.error("Error executing SQL file:", error);
        res.send("Error: "+ error)
    }
});

export {runSchemaRouter};