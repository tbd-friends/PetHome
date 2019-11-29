import React from "react";
import { RouteComponentProps } from "react-router";
import { Content } from "../../../components/Content";

export const AnimalDetailsPage: React.FC<RouteComponentProps> = props => {
  return (
    <Content>
      <h1>Animal Details</h1>
    </Content>
  );
};
