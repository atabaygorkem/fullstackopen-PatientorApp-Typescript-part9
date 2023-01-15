import diagnoseEntries from "../../data/diagnoseEntries";
import { Diagnosis } from "../types";

const getDiagnoses = (): Diagnosis[] => diagnoseEntries;

export default { getDiagnoses };
