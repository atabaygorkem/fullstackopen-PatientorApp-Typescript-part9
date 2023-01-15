import diagnoseEntries from "../../data/diagnoseEntries";
import { Diagnose } from "../types";

const getDiagnoses = (): Diagnose[] => diagnoseEntries;

export default { getDiagnoses };
