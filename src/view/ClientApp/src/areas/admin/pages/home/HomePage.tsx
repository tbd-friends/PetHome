import React from "react";
import { Theme, makeStyles, createStyles } from "@material-ui/core";
import { useAuth } from "../../../../store/auth/useAuth";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1
    }
  })
);

export const HomePage: React.FC = () => {
  const authCtx = useAuth();
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <pre>{JSON.stringify(authCtx.state, null, 2)}</pre>
    </div>
  );
};
