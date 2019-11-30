import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  makeStyles,
  Theme,
  createStyles,
  Checkbox,
  FormControlLabel,
  FormControl,
  InputLabel,
  Input,
  FormHelperText
} from "@material-ui/core";

import { RegisterAnimalInputModel } from "../../../utils/pethome.api";

interface AnimalRegisterFormProps {
  initialValues: RegisterAnimalInputModel;
  onSubmit: (values: RegisterAnimalInputModel) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    form: {
      display: "flex",
      flexDirection: "column"
    },
    formControl: {
      margin: theme.spacing(1)
    }
  })
);

const validationSchema = Yup.object().shape({
  species: Yup.string().required("You require a species"),
  breed: Yup.string().required("You require a breed"),
  color: Yup.string().required("You must enter a color"),
  gender: Yup.string().required("Gender is required"),
  weight: Yup.number()
    .moreThan(10, "You must enter a weight >10")
    .lessThan(100000, "That is not an animal we can support")
});

export const AnimalRegisterForm: React.FC<AnimalRegisterFormProps> = ({
  initialValues,
  onSubmit
}) => {
  const classes = useStyles();
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
    >
      {({ handleReset, isSubmitting, dirty }) => (
        <Form autoComplete="off" className={classes.form}>
          {MyTextField("species", "Species", classes)}
          {MyTextField("breed", "Breed", classes)}
          {MyTextField("color", "Color", classes)}
          {MyTextField("gender", "Gender", classes)}
          {MyTextField("weight", "Weight (g)", classes)}
          {MyTextField("tagNumber", "Tag Number", classes)}
          {MyTextField("circumstances", "Circumstances", classes)}
          {MyCheckbox("vetRequired", "Vet Required", classes)}
          {MyTextField("notes", "Add Notes", classes)}
          <div>
            <Button type="submit" disabled={isSubmitting}>
              Register
            </Button>
            <Button type="reset" onClick={handleReset} disabled={!dirty}>
              Reset
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const MyTextField = (name: string, label: string, classes: any) => (
  <Field name={name}>
    {({ field, form, meta }: any) => (
      <FormControl className={classes.formControl} error={!!meta.error}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
        <Input id={name} {...field} aria-describedby={name} />
        {meta.touched && meta.error && (
          <FormHelperText>{meta.error}</FormHelperText>
        )}
      </FormControl>
    )}
  </Field>
);

const MyCheckbox = (name: string, label: string, classes: any) => (
  <Field name={name}>
    {({ field, form, meta }: any) => (
      <FormControlLabel
        className={classes.formControl}
        control={
          <Checkbox
            name={field.name}
            checked={field.value}
            onChange={field.onChange}
            onBlur={field.onBlur}
            value={field.value}
          />
        }
        label={label}
      />
    )}
  </Field>
);
