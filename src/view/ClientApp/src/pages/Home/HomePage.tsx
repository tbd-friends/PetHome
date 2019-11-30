import React from "react";
import { RouteComponentProps } from "react-router";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

import { Content } from "../../components/Content";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      margin: 15
    }
  })
);

export const HomePage: React.FC<RouteComponentProps> = props => {
  const classes = useStyles();
  return (
    <Content>
      <div className={classes.container}>
        <h1>Home Page</h1>
        <p>This is the home page</p>
      </div>
    </Content>
  );
};
