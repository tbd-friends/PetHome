import React from "react";
//import { useLayout } from "../layout/useLayout";
import { RegisterPetsForm } from "./forms/RegisterPetForm";
import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const RegisterPetsPage: React.FC = () => {
  //const layoutCtx = useLayout();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1>Register Page</h1>
      <RegisterPetsForm />
    </div>
  );
};
