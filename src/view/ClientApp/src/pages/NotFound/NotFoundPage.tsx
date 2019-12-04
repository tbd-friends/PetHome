import React from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles, createStyles } from "@material-ui/core";

import { Content } from "../../components/Content";

const useStyles = makeStyles(() =>
  createStyles({
    container: {
      margin: 15
    }
  })
);

export const NotFoundPage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  return (
    <Content>
      <div className={classes.container}>
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
    </Content>
  );
};
