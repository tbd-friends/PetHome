import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../components/Content";

export const HomePage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <h1>Home Page</h1>
      <p>This is the home page</p>
    </Content>
  );
};
