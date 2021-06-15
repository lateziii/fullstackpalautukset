"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var patients_1 = __importDefault(require("../data/patients"));
var uuid_1 = require("uuid");
var patients = patients_1.default.map(function (_a) {
    var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, gender = _a.gender, occupation = _a.occupation, entries = _a.entries;
    return ({
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        gender: gender,
        occupation: occupation,
        entries: entries
    });
});
var patientsWithSsn = patients_1.default.map(function (_a) {
    var id = _a.id, name = _a.name, dateOfBirth = _a.dateOfBirth, ssn = _a.ssn, gender = _a.gender, occupation = _a.occupation, entries = _a.entries;
    return ({
        id: id,
        name: name,
        dateOfBirth: dateOfBirth,
        ssn: ssn,
        gender: gender,
        occupation: occupation,
        entries: entries
    });
});
var getEntries = function () {
    return patients;
};
var getOne = function (id) {
    return patientsWithSsn.find(function (p) { return p.id === id; });
};
var addPatient = function (entry) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    var id = uuid_1.v1();
    var newEntry = __assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        id: id }, entry);
    patients.push(newEntry);
    return newEntry;
};
var addEntry = function (id, entry) {
    var patient = getOne(id);
    if (patient) {
        patient.entries.push(entry);
    }
    else {
        throw new Error('Wrong id!');
    }
    return entry;
};
exports.default = {
    getEntries: getEntries,
    addPatient: addPatient,
    getOne: getOne,
    addEntry: addEntry
};
