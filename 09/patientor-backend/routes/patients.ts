import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getEntries());
});
patientRouter.post('/', (req, res) => {
    console.log('no niin?');
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try{
        const newPatientEntry = toNewPatientEntry(req.body);
        const added = patientService.addEntry(newPatientEntry);
        res.json(added);
    } catch (error) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).send({error: error.message});
    }
});

export default patientRouter;