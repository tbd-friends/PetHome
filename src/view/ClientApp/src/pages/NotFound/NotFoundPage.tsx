import React from "react";
import { RouteComponentProps } from "react-router";

export const NotFoundPage: React.FC<RouteComponentProps> = props => {
  return (
    <div>
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
    </div>
  );
};
