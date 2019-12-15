import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../../components/Content";
import { Container } from "@material-ui/core";

export const AnimalEditPage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <Container maxWidth="xl">
        <h1>Animal Edit</h1>
        <p>This is the animal edit page</p>
      </Container>
    </Content>
  );
};
