import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../../components/Content";

export const AnimalEditPage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <h1>Animal Edit</h1>
      <p>This is the animal edit page</p>
    </Content>
  );
};
