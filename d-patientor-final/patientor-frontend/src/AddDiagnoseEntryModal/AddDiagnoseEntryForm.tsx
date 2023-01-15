import { Formik, Form, Field, FormikProps } from "formik";
import { useState } from "react";

import {
  DiagnosisSelection,
  NumberField,
  TextField,
} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { EntryWithoutId, HealthCheckRating } from "../types";
import { Button, Grid } from "@material-ui/core";
// import { v4 as uuid } from "uuid";

// function giveMeUuid(): string {
//   return uuid();
// }

interface Props {
  onSubmit: (values: EntryWithoutId) => void;
  onCancel: () => void;
}

const AppropriateEntryComponent = ({
  initialValues,
  children,
  setFieldValue,
}: {
  initialValues: EntryWithoutId;
  children: JSX.Element;
  setFieldValue: FormikProps<{ healthCheckRating: number }>["setFieldValue"];
}) => {
  switch (initialValues.type) {
    case "HealthCheck":
      return (
        <>
          {Object.keys(initialValues)
            .slice(0, 3)
            .map((key) => (
              <Field
                key={key}
                label={key.charAt(0) + key.slice(1)}
                placeholder={key.charAt(0) + key.slice(1)}
                name={key}
                component={TextField}
              />
            ))}
          <Field
            label={"Health Check Rating"}
            placeholder={"Health Check Rating"}
            name={"healthCheckRating"}
            min={HealthCheckRating.Healthy}
            max={HealthCheckRating.CriticalRisk}
            setFieldValue={setFieldValue}
            component={NumberField}
          />
          {children}
        </>
      );
    case "Hospital":
      return (
        <>
          {Object.keys(initialValues)
            .slice(0, 3)
            .map((key) => (
              <Field
                key={key}
                label={key.charAt(0) + key.slice(1)}
                placeholder={key.charAt(0) + key.slice(1)}
                name={key}
                component={TextField}
              />
            ))}
          <Field
            label={"DischargeDate"}
            placeholder={"2023"}
            name={"discharge.date"}
            component={TextField}
          />
          <Field
            label={"DischargeCriteria"}
            placeholder={"DischargeCriteria"}
            name={"discharge.criteria"}
            component={TextField}
          />
          {children}
        </>
      );
    case "OccupationalHealthcare":
      return (
        <>
          {Object.keys(initialValues)
            .slice(0, 3)
            .map((key) => (
              <Field
                key={key}
                label={key.charAt(0) + key.slice(1)}
                placeholder={key.charAt(0) + key.slice(1)}
                name={key}
                component={TextField}
              />
            ))}
          <Field
            label={"Employer Name"} //key prop was the source of controlled to uncontrolled or vice versa error
            placeholder={"Employer Name"}
            name={"employerName"}
            component={TextField}
          />
          <Field
            label={"Start Date"}
            placeholder={"Start Date"}
            name={"sickLeave.startDate"}
            component={TextField}
          />
          <Field
            label={"End Date"}
            placeholder={"End Date"}
            name={"sickLeave.endDate"}
            component={TextField}
          />
          {children}
        </>
      );
    default:
      return <></>;
  }
};

function returnAppropriateEntryObject(type: string): EntryWithoutId {
  switch (type) {
    case "HealthCheck":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: 0,
      };
    case "Hospital":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "Hospital",
        discharge: { date: "", criteria: "" },
      };
    case "OccupationalHealthcare":
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "OccupationalHealthcare",
        employerName: "",
        sickLeave: { startDate: "", endDate: "" },
      };
    default:
      return {
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.CriticalRisk,
      };
  }
}

const AddDiagnoseEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnoses }] = useStateValue();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const [entryType, setEntryType] = useState("HealthCheck");
  const [initialValues, setInitialValues] = useState<EntryWithoutId>(
    returnAppropriateEntryObject("HealthCheck")
  );

  // const initialValues: EntryWithoutId = returnAppropriateEntryObject(entryType);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize
      validate={(values) => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors["description"] = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (values.type === "HealthCheck" && !values.healthCheckRating) {
          errors.healthCheckRating = requiredError;
        }
        if (values.type === "Hospital" && !values.discharge.date) {
          errors["discharge.date"] = requiredError; //not working
        }
        if (values.type === "Hospital" && !values.discharge.criteria) {
          errors["discharge.criteria"] = requiredError;
        }
        if (values.type === "OccupationalHealthcare" && !values.employerName) {
          errors.employerName = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
        console.log("Formik values: ", values);
        console.log("Initvalues: ", initialValues);
        console.log("**************************************");

        return (
          <Form className="form ui">
            {/* {Object.keys(initialValues).map((key) => (
              <Field
                key={key}
                label={key.charAt(0) + key.slice(1)}
                placeholder={key.charAt(0) + key.slice(1)}
                name={key}
                component={TextField}
              />
            ))} */}
            <AppropriateEntryComponent
              setFieldValue={setFieldValue}
              initialValues={values}
            >
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
            </AppropriateEntryComponent>

            <Grid>
              <Grid item>
                <Button
                  style={{ float: "left" }}
                  color="secondary"
                  variant="contained"
                  type="button"
                  onClick={onCancel}
                >
                  cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{ float: "left" }}
                  variant="contained"
                  type="submit"
                  disabled={!dirty || !isValid}
                >
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  style={{ float: "right", margin: "2px" }}
                  variant="outlined"
                  color="secondary"
                  disabled={initialValues.type === "HealthCheck"}
                  type="button"
                  onClick={() =>
                    setInitialValues(
                      returnAppropriateEntryObject("HealthCheck")
                    )
                  }
                >
                  HealthCheck
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  style={{ float: "right", margin: "2px" }}
                  variant="outlined"
                  color="secondary"
                  disabled={initialValues.type === "Hospital"}
                  type="button"
                  onClick={() =>
                    setInitialValues(returnAppropriateEntryObject("Hospital"))
                  }
                >
                  Hospital
                </Button>
              </Grid>
              <Grid item>
                <Button
                  size="small"
                  style={{ float: "right", margin: "2px" }}
                  variant="outlined"
                  color="secondary"
                  disabled={initialValues.type === "OccupationalHealthcare"}
                  type="button"
                  onClick={() =>
                    setInitialValues(
                      returnAppropriateEntryObject("OccupationalHealthcare")
                    )
                  }
                >
                  OccupationalHealthcare
                </Button>
              </Grid>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddDiagnoseEntryForm;
