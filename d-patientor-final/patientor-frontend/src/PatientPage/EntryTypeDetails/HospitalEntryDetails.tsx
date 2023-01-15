import { useStateValue } from "../../state";
import { HospitalEntry } from "../../types";
import MonitorHeartIcon from "@mui/icons-material/MonitorHeart";

const HospitalEntryDetails = ({ entry }: { entry: HospitalEntry }) => {
  const [{ diagnoses }] = useStateValue();
  console.log("hospital");

  return (
    <div>
      <p>
        {entry.date} {<MonitorHeartIcon />}
      </p>
      <p>{entry.description}</p>
      {entry.discharge && (
        <p>
          Discharge: {entry.discharge.date}. Criteriea:{" "}
          {entry.discharge.criteria}
        </p>
      )}
      <p>Diagnose by {entry.specialist}</p>
      {entry.diagnosisCodes?.map((code, i) => {
        return (
          <div key={i}>
            <li>
              {code} {diagnoses.find((d) => d.code === code)?.name}
            </li>
          </div>
        );
      })}
    </div>
  );
};

export default HospitalEntryDetails;
