import express from "express";
import patientService from "../services/patientService";
import { Patient } from "../types";
import toNewPatientEntry, { toNewDiagnoseEntryOfPatient } from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.get("/:id", (req, res) => {
  const id = req.params.id;
  const patientObj = patientService.getPatientById(id);
  if (patientObj) {
    res.json(patientObj);
  }
});

router.post("/", (req, res) => {
  req.body.entries = [];
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatientEntry = toNewPatientEntry(req.body);
  const addedPatientEntry = patientService.addPatient(newPatientEntry);
  res.json(addedPatientEntry);
});

router.post("/:id/entries", (req, res) => {
  const id = req.params.id;
  const patientObj = patientService.getPatientById(id);
  if (!patientObj) {
    res.send("User not found");
    return;
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const diagnoseEntryObject = toNewDiagnoseEntryOfPatient(req.body);
  const updatedPatientEntry: Patient = patientService.updatePatient(
    patientObj,
    diagnoseEntryObject
  );
  res.json(updatedPatientEntry);
});

export default router;
