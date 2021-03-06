import express from "express";
import cors from 'cors';
import { Request, Response } from "express";
import diagnoseRouter from './routes/diagnoses';
import patientRouter from './routes/patients';

const app = express();
app.use(express.json());
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());

app.get("/api/ping", (_req: Request, res: Response) => {
    res.send("pong");
});
app.use('/api/diagnosis',diagnoseRouter);
app.use('/api/patients',patientRouter);

const PORT = 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});