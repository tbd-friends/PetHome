import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { usePets } from "../../../hooks/pets/usePets";
import { PetsList } from "./list/PetsList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const PetsPage: React.FC = () => {
  const petsContext = usePets();
  const classes = useStyles();

  const getAnimalsAction = petsContext.actions.animals.getAnimalsAction;

  React.useEffect(() => {
    getAnimalsAction();
  }, []);

  return (
    <div className={classes.root}>
      <h1>Pets List</h1>
      {petsContext.pethomeState.animals.loading ? (
        "Loading..."
      ) : (
        <PetsList animals={petsContext.pethomeState.animals.data} />
      )}
    </div>
  );
};
