import React from "react";
//import { useLayout } from "../layout/useLayout";
import { RegisterPetsForm } from "./forms/RegisterPetForm";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { returnStatement } from "@babel/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

const handleSubmit = (values: any) => {
  console.log(values);
  return;
};

export const RegisterPetsPage: React.FC = () => {
  //const layoutCtx = useLayout();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Register Page</h1>
      <RegisterPetsForm
        initialValues={{
          breed: "",
          species: "",
          color: "",
          gender: "",
          circumstances: "",
          notes: "",
          tagNumber: "",
          vetRequired: false,
          weight: 0
        }}
        onSubmit={handleSubmit}
      />
    </div>
  );
};
