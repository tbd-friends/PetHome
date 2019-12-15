import React from "react";
import {
  AppBar,
  Toolbar,
  Theme,
  makeStyles,
  createStyles,
  IconButton,
  Icon,
  Typography,
  Button
} from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { AppState, KnownActions } from "../store/types";
import { LayoutState, LayoutActionTypes } from "../store/Layout/types";
import { Dispatch } from "redux";
import { AuthActionTypes } from "../store/Auth/types";

const useStyles = makeStyles<Theme, LayoutState>(theme =>
  createStyles({
    appBarDrawerOpen: props => ({
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

export const Header: React.FC = () => {
  const layout = useSelector<AppState, LayoutState>(state => state.layout);
  const dispatch = useDispatch<Dispatch<KnownActions>>();
  const classes = useStyles(layout);

  return (
    <AppBar
      position="fixed"
      className={
        layout.drawerOpened
          ? classes.appBarDrawerClosed
          : classes.appBarDrawerOpen
      }
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open Drawer"
          edge="start"
          onClick={() => dispatch({ type: LayoutActionTypes.TOGGLE_DRAWER })}
          className={classes.menuButton}
        >
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" noWrap className={classes.title}>
          PetHome
        </Typography>
        <Button
          color="inherit"
          onClick={() => dispatch({ type: AuthActionTypes.LOGOUT })}
        >
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
};
