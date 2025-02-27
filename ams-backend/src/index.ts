import express, { Request, Response } from "express";
import cors from "cors"
import routes from "./routes"

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cors())


app.use("/api",routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!!");
});

app.listen(PORT, (error) => {
    if(error){
        console.log("Error starting the server! Error: ", error)
    }
  console.log(`Server running at http://localhost:${PORT}`);
});