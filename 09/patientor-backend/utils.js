"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var isString = function (text) {
    return typeof text === 'string' || text instanceof String;
};
var parseName = function (name) {
    if (!name || !isString(name)) {
        throw new Error('Incorrect or missing name');
    }
    return name;
};
var isDate = function (date) {
    return Boolean(Date.parse(date));
};
var parseDate = function (date) {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date' + date);
    }
    return date;
};
var parseSsn = function (ssn) {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn');
    }
    return ssn;
};
var isGender = function (param) {
    return param === 'other' || param === 'male' || param === 'female';
};
var parseGender = function (gender) {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error('Incorrect or missing gender');
    }
    return gender;
};
var parseOccupation = function (occupation) {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation');
    }
    return occupation;
};
var parseEntries = function (entries) {
    if (!entries) {
        throw new Error('Incorrect or missing occupation');
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};
var toNewPatientEntry = function (object) {
    return {
        name: parseName(object.name),
        dateOfBirth: parseDate(object.dateOfBirth),
        ssn: parseSsn(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        entries: parseEntries(object.entries)
    };
};
exports.default = toNewPatientEntry;
