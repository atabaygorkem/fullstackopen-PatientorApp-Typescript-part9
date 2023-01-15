import { useStateValue } from "../../state";
import { OccupationalHealthcareEntry } from "../../types";
import WorkIcon from "@mui/icons-material/Work";

const OccupationalHealthcareEntryDetails = ({
  entry,
}: {
  entry: OccupationalHealthcareEntry;
}) => {
  const [{ diagnoses }] = useStateValue();
  console.log("occupational");

  return (
    <div>
      <p>
        {entry.date} {<WorkIcon />} {entry.employerName}
      </p>
      <p>{entry.description}</p>
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

export default OccupationalHealthcareEntryDetails;
