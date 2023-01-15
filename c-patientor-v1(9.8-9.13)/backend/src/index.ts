import express from "express";
import cors from "cors";
import patientsRoute from "./routes/patientsRoute";
import diagnosesRoute from "./routes/diagnosesRoute";


const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  console.log("someone pinged here");
  res.send("pong");
});

app.use("/api/patients", patientsRoute);
app.use("/api/diagnoses", diagnosesRoute);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
