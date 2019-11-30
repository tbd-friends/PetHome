import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

import { Content } from "../../../components/Content";
import { useSelector, useDispatch } from "react-redux";
import { AppState, KnownActions } from "../../../store/types";
import { getAnimalSelector } from "../../../store/Animals/selectors";
import { Dispatch } from "redux";
import { AnimalsActionTypes, Animal } from "../../../store/Animals/types";
import { Loader } from "../../../components/Loader";

interface ParamsProps {
  animalId: string;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 15
    }
  })
);

export const AnimalDetailsPage: React.FC<RouteComponentProps<ParamsProps>> = ({
  match
}) => {
  const { animalId } = match.params;
  const animal = useSelector<AppState, Animal>(state => {
    return getAnimalSelector(state, animalId);
  });
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const classes = useStyles();

  useEffect(() => {
    dispatch({ type: AnimalsActionTypes.FETCH_ANIMAL, payload: { animalId } });
  }, []);

  return (
    <Content>
      <div className={classes.container}>
        <h1>Animal Details</h1>
        {animal ? (
          <div>
            <div>
              <label>Species: </label>
              {animal.species}
            </div>
            <div>
              <label>Color: </label>
              {animal.color}
            </div>
            <div>
              <label>Breed: </label>
              {animal.breed}
            </div>
            <div>
              <label>Gender: </label>
              {animal.gender}
            </div>
            <div>
              <label>Weight: </label>
              {animal.weight}
            </div>
            <div>
              <label>Tag: </label>
              {animal.tag}
            </div>
            <div>
              <label>circumstances: </label>
              {animal.circumstances}
            </div>
            <div>
              <label>Is Vet Required: </label>
              {JSON.stringify(animal.vetRequired)}
            </div>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </Content>
  );
};
