import React from "react";
import { Formik, Field } from "formik";
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
            </div>
            <div>
              <Field type="text" name="breed" placeholder="Breed" />
            </div>
            <div>
              <Field type="text" name="color" placeholder="Color" />
            </div>
            <div>
              <Field type="text" name="gender" placeholder="Gender" />
            </div>
            <div>
              <Field type="number" name="weight" placeholder="Weight" />
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
