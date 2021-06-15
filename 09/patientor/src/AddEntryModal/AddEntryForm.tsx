import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField,  DiagnosisSelection, NumberField, SelectTypeField, TypeOption } from "../AddPatientModal/FormField";
import { EntryEnum, EntryForm} from "../types";
import { useStateValue } from "../state";

export type EntryFormValues = EntryForm;

const typeOptions: TypeOption[] = [
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  { value: EntryEnum.HealthCheck, label: EntryEnum.HealthCheck },
  { value: EntryEnum.Hospital, label: EntryEnum.Hospital },
  {
    value: EntryEnum.OccupationalHealthcare,
    label: EntryEnum.OccupationalHealthcare,
  },
];


interface AddEntryProps {
  onSubmit: (values: EntryForm) => void;
  onCancel: () => void;
  id: string
}
const showTypeSpecificFields = (type: string) => {
  switch (type) {
    case 'Healthcheck':
      return (
        <Field
          label="Healthcheck Rating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );

    case 'Hospital':
      return (
        <div>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="dischargeDate"
            component={TextField}
          />
          <Field
            label="Criteria"
            name="dischargeCriteria"
            component={TextField}
          />
        </div>
      );

    case 'Occupational Healthcare':
      return (
        <div>
          <Field
            label="EmployerName"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sick Leave Start Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveStartDate"
            component={TextField}
          />
          <Field
            label="Sick Leave End Date"
            placeholder="YYYY-MM-DD"
            name="sickLeaveEndDate"
            component={TextField}
          />
        </div>
      );

    default:
      return null;
  }
};
const  isValidDate = (dateString: string) =>  {
  const regEx = /^\d{4}-\d{2}-\d{2}$/;
  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
  if(!dateString.match(regEx)) return false;  // Invalid format
  const d = new Date(dateString);
  const dNum = d.getTime();
  if(!dNum && dNum !== 0) return false; // NaN value, Invalid date
  return d.toISOString().slice(0,10) === dateString;
};


export const AddEntryForm = ({ onSubmit, onCancel, id } : AddEntryProps ) => {
    const [{ diagnosis }] = useStateValue();
    return (
      <Formik
        initialValues={{
          id: id,
          description: "",
          type: "Healthcheck",
          date: "",
          diagnosisCodes: [],
          specialist: ''
        }}
        onSubmit={onSubmit}
        validate={values => {
          const requiredError = "Field is required";
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.name = requiredError;
          }
          if (!values.type) {
            errors.ssn = requiredError;
          }
          if (!values.date) {
            errors.dateOfBirth = requiredError;
          }
          if (!isValidDate(values.date)) {
            errors.date = 'Date format must be: YYYY-MM-DD';
          }
          if ('Hospital' === values.type) {
            if (!values.dischargeCriteria) {
              errors.dischargeCriteria = requiredError;
            }
            if (!values.dischargeDate) {
              errors.dischargeDate = requiredError;
            }
            if (values.dischargeDate && !isValidDate(values.dischargeDate)) {
              errors.dischargeDate = 'Date format must be: YYYY-MM-DD';
            }
          }
          if ('Healthcheck' === values.type) {
            if (!values.healthCheckRating) {
              errors.healthCheckRating = requiredError;
            }
          }
          if ('Occupational Healthcare' === values.type) {
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (
              values.sickLeaveStartDate &&
              !isValidDate(values.sickLeaveStartDate)
            ) {
              errors.sickLeaveStartDate = 'Date format must be: YYYY-MM-DD';
            }
            if (
              values.sickLeaveEndDate &&
              !isValidDate(values.sickLeaveEndDate)
            ) {
              errors.sickLeaveEndDate = 'Date format: YYYY-MM-DD';
            }
          }
          return errors;
        }}
      >
        {({ isValid, dirty, setFieldValue, setFieldTouched, values }) => {
          return (
            <Form className="form ui">
               <SelectTypeField label="Types" name="type" options={typeOptions} />
              <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />   
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <Field
                label="Date "
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              {showTypeSpecificFields(values.type)}
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
    );
  };

export default AddEntryForm;