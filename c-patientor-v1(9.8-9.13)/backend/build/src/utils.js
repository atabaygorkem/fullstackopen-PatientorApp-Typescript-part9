"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const toNewPatientEntry = ({ name, occupation, gender, ssn, dateOfBirth, }) => {
    const newEntry = {
        name: parseName(name),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDate(dateOfBirth),
    };
    return newEntry;
};
const isString = (text) => {
    return typeof text === "string" || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error("Incorrect or missing name");
    }
    return name;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error("Incorrect or missing occupation");
    }
    return occupation;
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error("Incorrect or missing gender");
    }
    return gender;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseSsn = (ssn) => {
    if (!ssn)
        return undefined;
    if (!isString(ssn)) {
        throw new Error("Incorrect ssn");
    }
    return ssn;
};
const parseDate = (date) => {
    if (!date)
        return undefined;
    if (!isString(date) || !isDate(date)) {
        throw new Error("Incorrect or missing date: " + date);
    }
    return date;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
exports.default = toNewPatientEntry;
