import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core";
import { usePets } from "../../../hooks/pets/usePets";
import { PetsList } from "./list/PetsList";
import { getAnimalsAction } from "../../../store/petHome/usePetHomeAction";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const PetsPage: React.FC = () => {
  const { state, dispatch } = usePets();
  const classes = useStyles();

  React.useEffect(() => {
    getAnimalsAction(dispatch);
  }, [dispatch]);

  return (
    <div className={classes.root}>
      <h1>Pets List</h1>
      {state.animals.loading ? (
        "Loading..."
      ) : (
        <PetsList animals={state.animals.data} />
      )}
    </div>
  );
};
