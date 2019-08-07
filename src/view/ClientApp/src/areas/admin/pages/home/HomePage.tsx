import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const HomePage: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.root}>Home Page</div>;
};
