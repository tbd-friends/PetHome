import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Icon
} from "@material-ui/core";
import { useLayout } from "../layout/useLayout";
import { LayoutState } from "../layout/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBarDrawerOpen: (props: LayoutState) => ({
      marginLeft: props.drawerWidth,
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${props.drawerWidth}px)`
      }
    }),
    appBarDrawerClosed: {
      [theme.breakpoints.up("sm")]: {
        width: "100%"
      }
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none"
      }
    },
    title: {
      flexGrow: 1
    }
  })
);

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  const layoutCtx = useLayout();
  const classes = useStyles(layoutCtx.layout);

  return (
    <AppBar
      position="fixed"
      className={
        layoutCtx.layout.opened
          ? classes.appBarDrawerClosed
          : classes.appBarDrawerOpen
      }
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          edge="start"
          onClick={() => layoutCtx.actions.toggleOpened()}
          className={classes.menuButton}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          {title}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};
