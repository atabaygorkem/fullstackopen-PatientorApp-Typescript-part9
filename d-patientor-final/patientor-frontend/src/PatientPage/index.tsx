import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";
import { EntryWithoutId, Patient } from "../types";
import FemaleIcon from "@mui/icons-material/Female";
import MaleIcon from "@mui/icons-material/Male";
import BlurCircularIcon from "@mui/icons-material/BlurCircular";
import EntryDetails from "./EntryDetails";
import AddDiagnoseEntryModal from "../AddDiagnoseEntryModal";
import { Button, Box } from "@material-ui/core";

const PatientPage = () => {
  const [{ currentFullPatient }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();

  const [modalDiagnoseOpen, setModalDiagnoseOpen] =
    React.useState<boolean>(false);
  const [diagnoseError, setDiagnoseError] = React.useState<string>();

  React.useEffect(() => {
    const fetchCurrentPatient = async () => {
      try {
        if (!id) return;
        const { data: patientFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );

        dispatch(setPatient(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    void fetchCurrentPatient();
  }, [dispatch]);

  if (!currentFullPatient) return <></>;
  // console.log(currentFullPatient.entries);

  ///////////////Formik adjustments///////////

  const openModal = (): void => setModalDiagnoseOpen(true);

  const closeModal = (): void => {
    setModalDiagnoseOpen(false);
    setDiagnoseError(undefined);
  };

  async function submitNewDiagnoseEntry(values: EntryWithoutId) {
    // console.log("Values: ", values);
    // console.log("id***********************************************", id);
    try {
      if (!id) return;
      const { data: patientWithUpdatedEntries } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setPatient(patientWithUpdatedEntries));
      closeModal();
      console.log("Returned patient:  ", patientWithUpdatedEntries);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || "Unrecognized axios error");
        setDiagnoseError(
          String(e?.response?.data?.error) || "Unrecognized axios error"
        );
      } else {
        console.error("Unknown error", e);
        setDiagnoseError("Unknown error");
      }
    }
  }

  return (
    <div>
      <h2>
        {currentFullPatient.name}{" "}
        {currentFullPatient.gender === "male" ? (
          <MaleIcon />
        ) : currentFullPatient.gender === "female" ? (
          <FemaleIcon />
        ) : (
          <BlurCircularIcon />
        )}
      </h2>
      <p>Ssn: {currentFullPatient.ssn}</p>
      <p>Occupation: {currentFullPatient.occupation}</p>
      <h2>Entries</h2>
      {currentFullPatient.entries.map((entry, index) => (
        <div key={index} style={{ marginBottom: "16px" }}>
          <Box
            sx={{
              border: "2px solid",
              borderColor: "gray",
              borderRadius: 1,
              boxShadow: 1,
              p: 1,
            }}
          >
            <EntryDetails entry={entry} />
          </Box>
        </div>
      ))}

      <AddDiagnoseEntryModal
        modalOpen={modalDiagnoseOpen}
        onSubmit={submitNewDiagnoseEntry}
        error={diagnoseError}
        onClose={closeModal}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Diagnose Entry
      </Button>
    </div>
  );
};

export default PatientPage;
