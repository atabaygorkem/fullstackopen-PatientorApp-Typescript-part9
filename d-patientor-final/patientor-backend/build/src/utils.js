"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewDiagnoseEntryOfPatient = void 0;
const types_1 = require("./types");
const toNewPatientEntry = ({ name, occupation, gender, ssn, dateOfBirth, entries, }) => {
    const newEntry = {
        name: parseName(name),
        occupation: parseOccupation(occupation),
        gender: parseGender(gender),
        ssn: parseSsn(ssn),
        dateOfBirth: parseDate(dateOfBirth),
        entries: parseEntries(entries),
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
const parseEntries = (entries) => {
    if (!Array.isArray(entries) || !isEntry(entries[0] ? entries[0] : 1)) {
        throw new Error("Incorrect Entry");
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return entries;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEntry = (entry) => {
    if (entry === 1)
        return true;
    if (entry) {
        return true;
    }
    return false;
};
////////////////////////////***Validate patient's entry***///////////////////////////////////////
const toNewDiagnoseEntryOfPatient = (entryObj) => {
    switch (entryObj.type) {
        case "Hospital":
            const hospitalEntry = {
                description: parseDescription(entryObj.description),
                date: parseRequiredDate(entryObj.date, parseDate),
                specialist: parseSpecialist(entryObj.specialist),
                diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),
                type: entryObj.type,
                discharge: parseDischarge(entryObj.discharge),
            };
            return hospitalEntry;
        case "HealthCheck":
            const healthCheckEntry = {
                description: parseDescription(entryObj.description),
                date: parseRequiredDate(entryObj.date, parseDate),
                specialist: parseSpecialist(entryObj.specialist),
                diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),
                type: entryObj.type,
                healthCheckRating: parseHealthCheckRating(entryObj.healthCheckRating),
            };
            return healthCheckEntry;
        case "OccupationalHealthcare":
            const occupationalHealthcareEntry = {
                description: parseDescription(entryObj.description),
                date: parseRequiredDate(entryObj.date, parseDate),
                specialist: parseSpecialist(entryObj.specialist),
                diagnosisCodes: parseDiagnosisCodes(entryObj.diagnosisCodes),
                type: entryObj.type,
                employerName: parseEmployerName(entryObj.employerName),
                sickLeave: parseSickLeave(entryObj.sickLeave),
            };
            return occupationalHealthcareEntry;
        default:
            return assertNever(entryObj);
    }
};
exports.toNewDiagnoseEntryOfPatient = toNewDiagnoseEntryOfPatient;
const assertNever = (value) => {
    throw new Error(`Unhandled discriminated union member: ${JSON.stringify(value)}`);
};
exports.default = toNewPatientEntry;
function parseDescription(description) {
    if (!description || !isString(description)) {
        throw new Error("Incorrect or missing description");
    }
    return description;
}
function parseRequiredDate(date, callback) {
    const returnedDate = callback(date);
    if (!returnedDate) {
        throw new Error("Missing date");
    }
    return returnedDate;
}
function parseSpecialist(specialist) {
    if (!specialist || !isString(specialist)) {
        throw new Error("Incorrect or missing specialist");
    }
    return specialist;
}
function parseDiagnosisCodes(diagnosisCodes) {
    if (!diagnosisCodes)
        return undefined;
    if (!Array.isArray(diagnosisCodes) ||
        !(diagnosisCodes.length ? isString(diagnosisCodes[0]) : 1)) {
        throw new Error("Incorrect diagnosis code");
    }
    return diagnosisCodes;
}
function parseDischarge(discharge) {
    const tempDate = discharge.date;
    const tempCriteria = discharge.criteria;
    if (!isString(tempDate) || !isString(tempCriteria)) {
        throw new Error("Incorrect or missing discharge");
    }
    return { date: tempDate, criteria: tempCriteria };
}
function parseHealthCheckRating(healthCheckRating) {
    if (healthCheckRating === undefined ||
        !isHealthCheckRating(healthCheckRating)) {
        throw new Error("Incorrect or missing healthCheckRating");
    }
    return healthCheckRating;
}
function isHealthCheckRating(healthCheckRating) {
    return Object.values(types_1.HealthCheckRating).includes(+healthCheckRating);
}
function parseEmployerName(employerName) {
    if (!employerName || !isString(employerName)) {
        throw new Error("Incorrect or missing employer name");
    }
    return employerName;
}
function parseSickLeave(sickLeave) {
    if (!sickLeave)
        return undefined;
    const tempStartDate = sickLeave.startDate;
    const tempEndDate = sickLeave.endDate;
    if (!isString(tempStartDate) || !isString(tempEndDate)) {
        throw new Error("Incorrect sickleave");
    }
    return { startDate: tempStartDate, endDate: tempEndDate };
}
