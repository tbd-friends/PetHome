import React from "react";
import { Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      paddingLeft: 10
    }
  })
);

export const RegisterPetsForm: React.FC = () => {
  //const layoutCtx = useLayout();
  const classes = useStyles();

  const validationSchema = Yup.object().shape({
    species: Yup.string().required("You require a species"),
    breed: Yup.string().required("You require a breed"),
    color: Yup.string().required("You must enter a color"),
    gender: Yup.string().required("Gender is required"),
    weight: Yup.number().moreThan(10, "You must enter a weight")
  });

  return (
    <div className={classes.root}>
      <Formik
        initialValues={{
          species: "",
          breed: "",
          color: "",
          gender: "",
          weight: 0,
          tagNumber: "",
          circumstances: "",
          vetRequired: "",
          notes: ""
        }}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          actions.setSubmitting(false);

          console.log(values);
        }}
        render={({
          values,
          errors,
          status,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting
        }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <Field type="text" name="species" placeholder="Species" />
              <ErrorMessage name="species" />
            </div>
            <div>
              <Field type="text" name="breed" placeholder="Breed" />
              <ErrorMessage name="breed" />
            </div>
            <div>
              <Field type="text" name="color" placeholder="Color" />
              <ErrorMessage name="color" />
            </div>
            <div>
              <Field type="text" name="gender" placeholder="Gender" />
              <ErrorMessage name="gender" />
            </div>
            <div>
              <Field type="number" name="weight" placeholder="Weight" />
              <ErrorMessage name="weight" />
            </div>
            <div>
              <Field type="text" name="tagNumber" placeholder="Tag Number" />
            </div>
            <div>
              <Field
                type="text"
                name="circumstances"
                placeholder="Circumstances"
              />
              <ErrorMessage name="circumstances" />
            </div>
            <div>
              <label>Vet Required</label>
              <Field type="checkbox" name="vetRequired" />
            </div>
            <Field type="text" name="notes" placeholder="Add Notes" />
            <button type="submit">Register</button>
          </form>
        )}
      />
    </div>
  );
};
