"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patientService_1 = __importDefault(require("../services/patientService"));
const utils_1 = __importDefault(require("../utils"));
const router = express_1.default.Router();
router.get("/", (_req, res) => {
    res.send(patientService_1.default.getNonSensitivePatientEntries());
});
router.post("/", (req, res) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const newPatientEntry = (0, utils_1.default)(req.body);
    const addedPatientEntry = patientService_1.default.addPatient(newPatientEntry);
    res.json(addedPatientEntry);
});
exports.default = router;
