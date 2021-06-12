import express, { Request, Response } from 'express';
import { parseAndGetBmi } from "./bmiCalculator";
import { parseAndCalculateExercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());


app.get('/', (_req: Request, res: Response) => {
    res.send('Hello Full Stack');
});

app.get('/bmi', ({ query }: Request, res: Response) => {
    const weight = query.weight;
    const height = query.height;
    try {
      res.send({ weight, height, bmi: parseAndGetBmi(height, weight) });
    } catch {
      res.send({ error: "malformatted parameters" });
    }
});

app.post('/exercises', ({ body }: Request, res: Response ) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        res.send(parseAndCalculateExercises(body?.daily_exercises, body?.target));
    } catch (error) {
        res.send(error);
    }
});

const PORT = 3002;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});