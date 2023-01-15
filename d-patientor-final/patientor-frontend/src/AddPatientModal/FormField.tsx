import React, { useState } from "react";
import { ErrorMessage, Field, FieldProps, FormikProps } from "formik";
import {
  Select,
  FormControl,
  MenuItem,
  TextField as TextFieldMUI,
  Typography,
} from "@material-ui/core";
import { Diagnosis, Gender, HealthCheckRating } from "../types";
import { InputLabel } from "@material-ui/core";
import Input from "@material-ui/core/Input";
import SickIcon from "@mui/icons-material/Sick";
import { Chip } from "@mui/material";

// structure of a single option
export type GenderOption = {
  value: Gender;
  label: string;
};

// props for select field component
type SelectFieldProps = {
  name: string;
  label: string;
  options: GenderOption[];
};

const FormikSelect = ({ field, ...props }: FieldProps) => (
  <Select {...field} {...props} />
);

export const SelectField = ({ name, label, options }: SelectFieldProps) => (
  <>
    <InputLabel>{label}</InputLabel>
    <Field
      fullWidth
      style={{ marginBottom: "0.5em" }}
      label={label}
      component={FormikSelect}
      name={name}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label || option.value}
        </MenuItem>
      ))}
    </Field>
  </>
);

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <div style={{ marginBottom: "1em" }}>
    <TextFieldMUI
      fullWidth
      label={label}
      placeholder={placeholder}
      {...field}
    />
    <Typography variant="subtitle2" style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </Typography>
  </div>
);

/*
  for exercises 9.24.-
*/
interface NumberProps extends FieldProps {
  label: string;
  min: HealthCheckRating;
  max: HealthCheckRating;
  setFieldValue: FormikProps<{ healthCheckRating: number }>["setFieldValue"];
}

export const NumberField = ({
  field,
  label,
  min,
  max,
  setFieldValue,
}: NumberProps) => {
  // const [value, setValue] = useState<number>();

  return (
    <div style={{ marginBottom: "1em" }}>
      <TextFieldMUI
        fullWidth
        label={label}
        placeholder={String(min)}
        type="number"
        {...field}
        // value={value}
        onChange={(e) => {
          const tempValue = parseInt(e.target.value);
          if (tempValue === undefined) return;

          if (tempValue > max) setFieldValue("healthCheckRating", max);
          else if (tempValue <= min) setFieldValue("healthCheckRating", min);
          else setFieldValue("healthCheckRating", Math.floor(tempValue));
          console.log("Number field: ", tempValue);
          // console.log("Number state: ", value);
        }}
      />
      <Typography variant="subtitle2" style={{ color: "red" }}>
        <ErrorMessage name={field.name} />
      </Typography>
    </div>
  );
};

export const DiagnosisSelection = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: Diagnosis[];
  setFieldValue: FormikProps<{ diagnosisCodes: string[] }>["setFieldValue"];
  setFieldTouched: FormikProps<{ diagnosisCodes: string[] }>["setFieldTouched"];
}) => {
  const [selectedDiagnoses, setDiagnoses] = useState<string[]>([]);
  console.log(
    "entry to diagnosis component. selectedDiagnoses (state)",
    selectedDiagnoses
  );

  const field = "diagnosisCodes";
  const onChange = (data: string[]) => {
    console.log("Diagnose data: ", data);

    setDiagnoses([...data]);
    setFieldTouched(field, true);
    console.log(
      "selectedDiagnoses => isnt it updated? inside onChange",
      selectedDiagnoses
    );

    setFieldValue(field, [...data]);
  };

  const stateOptions = diagnoses.map((diagnosis) => ({
    key: diagnosis.code,
    text: `${diagnosis.name} (${diagnosis.code})`,
    value: diagnosis.code,
  }));

  return (
    <FormControl style={{ width: 552, marginBottom: "30px" }}>
      <InputLabel>Diagnoses</InputLabel>
      <Select
        multiple
        value={selectedDiagnoses}
        onChange={(e) => onChange(e.target.value as string[])}
        input={<Input />}
      >
        {stateOptions.map((option) => (
          <MenuItem key={option.key} value={option.value}>
            {option.text}
          </MenuItem>
        ))}
      </Select>
      {/* <TextFieldMUI disabled={true} value={selectedDiagnoses} /> */}
      {/* <Chip icon={<SickIcon />} label="With Icon" /> */}
      <div>
        {selectedDiagnoses.map((diagnose) => (
          <Chip
            key={diagnose}
            icon={<SickIcon />}
            label={diagnose}
            onClick={() =>
              onChange(selectedDiagnoses.filter((d) => d !== diagnose))
            }
          />
        ))}
      </div>
      <ErrorMessage name={field} />
    </FormControl>
  );
};
