import React from "react";
import { RouteComponentProps } from "react-router";

export const HomePage: React.FC<RouteComponentProps> = props => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>This is the home page</p>
    </div>
  );
};
