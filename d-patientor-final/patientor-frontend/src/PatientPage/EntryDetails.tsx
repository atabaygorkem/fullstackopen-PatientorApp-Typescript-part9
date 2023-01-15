import React from "react";
import { Entry } from "../types";
import HealthCheckEntryDetails from "./EntryTypeDetails/HealtchCheckEntryDetails";
import HospitalEntryDetails from "./EntryTypeDetails/HospitalEntryDetails";
import OccupationalHealthcareEntryDetails from "./EntryTypeDetails/OccupationalHealthcareEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcareEntryDetails entry={entry} />;
    default:
      return <></>;
  }
};

// const EntryDetails = ({ entry }: { entry: Entry }) => {

// };

export default EntryDetails;
