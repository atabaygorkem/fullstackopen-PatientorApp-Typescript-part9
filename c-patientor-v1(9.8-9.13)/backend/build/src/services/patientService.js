"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const patientEntries_1 = __importDefault(require("../../data/patientEntries"));
const uuid_1 = require("uuid");
const getPatients = () => patientEntries_1.default;
const getNonSensitivePatientEntries = () => {
    return patientEntries_1.default.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};
const addPatient = (entry) => {
    const newPatientEntry = Object.assign({ 
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
        id: (0, uuid_1.v4)() }, entry);
    patientEntries_1.default.push(newPatientEntry);
    return newPatientEntry;
};
exports.default = { getPatients, getNonSensitivePatientEntries, addPatient };
