import React from "react";
import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const PetsPage: React.FC = () => {
  const classes = useStyles();

  return <div className={classes.root}>Pets Page</div>;
};
