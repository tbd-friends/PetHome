import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../../components/Content";

export const AnimalsListPage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <h1>Animals List</h1>
      <p>This is the animals list page</p>
    </Content>
  );
};
