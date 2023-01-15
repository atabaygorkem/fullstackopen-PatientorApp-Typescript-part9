import { useStateValue } from "../../state";
import { HealthCheckEntry, HealthCheckRating } from "../../types";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import FavoriteIcon from "@mui/icons-material/Favorite";

const HealthCheckEntryDetails = ({ entry }: { entry: HealthCheckEntry }) => {
  const [{ diagnoses }] = useStateValue();
  console.log("healthcheck");
  return (
    <div>
      <p>
        {entry.date} {<MedicalServicesIcon />}
      </p>
      <p>{entry.description}</p>
      <p>
        {entry.healthCheckRating === HealthCheckRating.Healthy ? (
          <FavoriteIcon sx={{ color: "green" }} />
        ) : entry.healthCheckRating === HealthCheckRating.LowRisk ? (
          <FavoriteIcon sx={{ color: "yellow" }} />
        ) : entry.healthCheckRating === HealthCheckRating.HighRisk ? (
          <FavoriteIcon sx={{ color: "orange" }} />
        ) : entry.healthCheckRating === HealthCheckRating.CriticalRisk ? (
          <FavoriteIcon sx={{ color: "red" }} />
        ) : (
          <></>
        )}
      </p>
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

export default HealthCheckEntryDetails;
