import React from "react";
import { Dispatch } from "redux";
import { useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

import { Content } from "../../../components/Content";
import { KnownActions } from "../../../store/types";
import { AnimalRegisterForm } from "./AnimalRegisterForm";
import { RegisterAnimalInputModel } from "../../../utils/pethome.api";
import { AnimalsActionTypes } from "../../../store/Animals/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 15
    }
  })
);

export const AnimalRegisterPage: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const initialValues: RegisterAnimalInputModel = {
    species: "",
    breed: "",
    color: "",
    gender: "",
    weight: 0,
    tagNumber: "",
    circumstances: "",
    vetRequired: false,
    notes: ""
  };
  const classes = useStyles();

  const handleSubmit = (values: RegisterAnimalInputModel) => {
    dispatch({
      type: AnimalsActionTypes.REGISTER_ANIMAL,
      payload: {
        newAnimal: values
      }
    });
  };

  return (
    <Content>
      <div className={classes.container}>
        <h1>Animals Register</h1>
        <AnimalRegisterForm
          initialValues={initialValues}
          onSubmit={handleSubmit}
        />
      </div>
    </Content>
  );
};
