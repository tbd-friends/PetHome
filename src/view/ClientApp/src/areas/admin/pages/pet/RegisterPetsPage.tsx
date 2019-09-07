import React from "react";
//import { useLayout } from "../layout/useLayout";
import { Theme, createStyles, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const RegisterPetsPage: React.FC = () => {
  //const layoutCtx = useLayout();
  const classes = useStyles();

  return <div className={classes.root}>Register Page</div>;
};
