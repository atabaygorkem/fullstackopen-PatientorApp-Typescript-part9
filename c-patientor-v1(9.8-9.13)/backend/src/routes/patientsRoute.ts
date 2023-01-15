import express from "express";
import patientService from "../services/patientService";
import toNewPatientEntry from "../utils";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries());
});

router.post("/", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const newPatientEntry = toNewPatientEntry(req.body);

  const addedPatientEntry = patientService.addPatient(newPatientEntry);
  res.json(addedPatientEntry);
});

export default router;
