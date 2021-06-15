"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var patientService_1 = __importDefault(require("../services/patientService"));
var utils_1 = __importDefault(require("../utils"));
var patientRouter = express_1.default.Router();
patientRouter.get('/', function (_req, res) {
    res.send(patientService_1.default.getEntries());
});
patientRouter.post('/', function (req, res) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    try {
        var newPatientEntry = utils_1.default(req.body);
        var added = patientService_1.default.addPatient(newPatientEntry);
        res.json(added);
    }
    catch (error) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).send({ error: error.message });
    }
});
patientRouter.get('/:id', function (req, res) {
    res.send(patientService_1.default.getOne(req.params.id));
});
patientRouter.post('/:id/entries', function (req, res) {
    try {
        var patientId = req.params.id;
        var entryAdded = patientService_1.default.addEntry(patientId, req.body);
        res.json(entryAdded);
    }
    catch (error) {
        console.log(error);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        res.status(400).send({ error: error.message });
    }
});
exports.default = patientRouter;
