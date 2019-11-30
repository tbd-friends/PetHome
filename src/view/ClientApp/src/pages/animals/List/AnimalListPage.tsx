import React from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

import { Content } from "../../../components/Content";
import { AppState, KnownActions } from "../../../store/types";
import { AnimalsActionTypes, Animal } from "../../../store/Animals/types";
import { allAnimalsSelector } from "../../../store/Animals/selectors";
import { AnimalList } from "./AnimalList";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 15
    }
  })
);

export const AnimalListPage: React.FC<RouteComponentProps> = props => {
  const animals = useSelector<AppState, Animal[]>(state =>
    allAnimalsSelector(state)
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const classes = useStyles();

  React.useEffect(() => {
    dispatch({
      type: AnimalsActionTypes.FETCH_ANIMALS
    });
  }, []);

  return (
    <Content>
      <div className={classes.container}>
        <h1>Animals List</h1>
        <AnimalList animals={animals} />
      </div>
    </Content>
  );
};
