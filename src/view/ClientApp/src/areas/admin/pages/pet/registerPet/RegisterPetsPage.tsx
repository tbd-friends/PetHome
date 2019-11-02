import React from "react";
import { usePets } from "../../../hooks/pets/usePets";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { RegisterPetsForm } from "./forms/RegisterPetForm";
import { registerAnimalAction } from "../../../store/petHome/usePetHomeAction";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const RegisterPetsPage: React.FC = () => {
  const { dispatch } = usePets();
  const classes = useStyles();

  const handleSubmit = (values: any) => {
    registerAnimalAction(values, dispatch);
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
