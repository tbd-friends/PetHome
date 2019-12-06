import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router";
import { Dispatch } from "redux";
import { useSelector, useDispatch } from "react-redux";
import { Container } from "@material-ui/core";

import { Content } from "../../../components/Content";
import { AppState, KnownActions } from "../../../store/types";
import { AnimalsActionTypes, Animal } from "../../../store/Animals/types";
import { allAnimalsSelector } from "../../../store/Animals/selectors";
import { AnimalList } from "./AnimalList";

export const AnimalListPage: React.FC<RouteComponentProps> = props => {
  const animals = useSelector<AppState, Animal[]>(state =>
    allAnimalsSelector(state)
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  useEffect(() => {
    dispatch({
      type: AnimalsActionTypes.FETCH_ANIMALS
    });
  }, []);

  return (
    <Content>
      <Container maxWidth="xl">
        <h1>Animals List</h1>
        <AnimalList animals={animals} />
      </Container>
    </Content>
  );
};
