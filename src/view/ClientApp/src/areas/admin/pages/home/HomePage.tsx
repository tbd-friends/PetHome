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
      <h1>{JSON.stringify(authCtx.state)}</h1>
      <button
        disabled={authCtx.state.user !== undefined}
        onClick={() => authCtx.actions.signIn("test", "test")}
      >
        SignIn
      </button>
      <button
        disabled={authCtx.state.user === undefined}
        onClick={() => authCtx.actions.signOut()}
      >
        SignOut
      </button>
    </div>
  );
};
