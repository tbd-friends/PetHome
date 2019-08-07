import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import { useLayout } from "../layout/useLayout";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    toolbar: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      minHeight: `calc(100vh - ${theme.mixins.toolbar.height}`
    }
  })
);

export const Content: React.FC = ({ children }) => {
  const layoutCtx = useLayout();
  const classes = useStyles(layoutCtx.layout);

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />
      {children}
    </main>
  );
};
