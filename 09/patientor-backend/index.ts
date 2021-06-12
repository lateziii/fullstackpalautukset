import express from "express";
import { Request, Response } from "express";

const app = express();
app.use(express.json)

app.get("/api/ping", (_req: Request, res: Response) => {
    res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});