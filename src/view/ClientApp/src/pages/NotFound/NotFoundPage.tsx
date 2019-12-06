import React from "react";
import { RouteComponentProps } from "react-router";
import { Container } from "@material-ui/core";

import { Content } from "../../components/Content";

export const NotFoundPage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <Container maxWidth="xl">
        <h1>404</h1>
        <p>
          hmm, nothing to find here,{" "}
          <a
            href="/"
            onClick={e => {
              e.preventDefault();
              props.history.goBack();
            }}
          >
            lets got somewhere else!
          </a>
        </p>
      </Container>
    </Content>
  );
};
