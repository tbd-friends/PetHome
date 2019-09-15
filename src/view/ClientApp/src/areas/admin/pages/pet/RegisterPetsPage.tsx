import React from "react";
import { usePets } from "../../hooks/pets/usePets";
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

export const RegisterPetsPage: React.FC = () => {
  const petsContext = usePets();
  const classes = useStyles();

  const handleSubmit = (values: any) => {
    petsContext.actions.animals.registerAnimal(values);
  };

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
