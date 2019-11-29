import React from "react";
import { Formik, Form } from "formik";
import { RegisterAnimalValues } from "./types";

interface AnimalRegisterFormProps {
  initialValues: RegisterAnimalValues;
  onSubmit: (values: RegisterAnimalValues) => void;
}

export const AnimalRegisterForm: React.FC<AnimalRegisterFormProps> = ({
  initialValues,
  onSubmit
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        onSubmit(values);
      }}
    >
      {formikBag => <Form autoComplete="off">Form</Form>}
    </Formik>
  );
};
