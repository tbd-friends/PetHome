import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../../components/Content";
import { useDispatch } from "react-redux";
import { Dispatch } from "redux";
import { KnownActions } from "../../../store/types";
import { RegisterAnimalValues } from "./types";
import { AnimalRegisterForm } from "./AnimalRegisterForm";

export const AnimalRegisterPage: React.FC<RouteComponentProps> = props => {
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const initialValues: RegisterAnimalValues = {};

  const handleSubmit = (values: RegisterAnimalValues) => {
    console.log(values);
    //dispatch();
  };

  return (
    <Content>
      <h1>Animals Register</h1>
      <AnimalRegisterForm
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </Content>
  );
};
