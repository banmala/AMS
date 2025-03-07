import mysql from "mysql2/promise";
import "dotenv/config"

const db = mysql.createPool({
    host: process.env.DB_HOST,
    port:3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

(async () => {
    try {
        const connection = await db.getConnection();
        console.log("Connected to MySQL!");
        connection.release();
    } catch (error) {
        console.error("Database Connection Failed! Error: ", error);
    }
})();

export {db};