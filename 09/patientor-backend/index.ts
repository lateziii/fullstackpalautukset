import express from "express";
import { Request, Response } from "express";

const app = express();

app.get("/ping", (_req: Request, res: Response) => {
    res.send("pong");
  });