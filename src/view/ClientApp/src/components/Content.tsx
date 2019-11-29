import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      minHeight: `calc(100vh - ${theme.mixins.toolbar.height})`
    },
    toolbar: theme.mixins.toolbar
  })
);

export const Content: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};
