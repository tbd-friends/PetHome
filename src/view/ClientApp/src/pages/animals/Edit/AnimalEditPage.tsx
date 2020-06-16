import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Content } from "../../../components/Content";
import { Container, Button } from "@material-ui/core";
import { AnimalEditForm } from "./AnimalEditForm";
import { UpdateAnimalInputModel } from "../../../utils/pethome.api";
import { Dispatch } from "redux";
import { KnownActions, AppState } from "../../../store/types";
import { useDispatch, useSelector } from "react-redux";
import { AnimalsActionTypes, Animal } from "../../../store/Animals/types";

export const AnimalEditPage: React.FC<RouteComponentProps<{
  animalId: string;
}>> = ({ match, history }) => {
  const { animalId } = match.params;
  const animal = useSelector<AppState, Animal>(
    state => state.animals.animalsById[animalId]
  );
  const dispatch = useDispatch<Dispatch<KnownActions>>();

  const goBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    history.goBack();
  };

  const handleSubmit = (values: UpdateAnimalInputModel) => {
    dispatch({
      type: AnimalsActionTypes.UPDATE_ANIMAL,
      payload: {
        id: animalId,
        animal: values
      }
    });
    history.goBack();
  };

  return (
    <Content>
      <Container maxWidth="xl">
        <Button onClick={goBack}>Back</Button>
        <h1>Animal Edit</h1>
        <AnimalEditForm initialValues={animal} onSubmit={handleSubmit} />
      </Container>
    </Content>
  );
};
