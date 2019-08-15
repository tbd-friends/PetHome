import React from "react";
import { createLayoutConfig } from "./createLayoutConfig";
import { LayoutState, ILayoutContext } from "./types";
import { makeStyles, Theme, createStyles } from "@material-ui/core";

const LAYOUT_OPENED = "@@layout/OPENED";
const LAYOUT_TOGGLE = "@@layout/TOGGLE";

export const LayoutContext = React.createContext<ILayoutContext>({
  layout: createLayoutConfig(),
  dispatch: () => {},
  actions: {
    setOpened: (opened: boolean) => {},
    toggleOpened: () => {}
  }
});

const layoutReducer: React.Reducer<LayoutState, any> = (state, action) => {
  switch (action.type) {
    case LAYOUT_OPENED:
      return { ...state, opened: action.payload };
    case LAYOUT_TOGGLE:
      return { ...state, opened: !state.opened };
    default:
      return state;
  }
};

interface LayoutProps {
  initialState?: LayoutState;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: { display: "flex" }
  })
);

export const Layout: React.FC<LayoutProps> = ({ initialState, children }) => {
  const layoutState = createLayoutConfig(initialState);
  const [state, dispatch] = React.useReducer(layoutReducer, layoutState);
  const classes = useStyles();

  const setOpened = (opened: boolean) => {
    dispatch({ type: LAYOUT_OPENED, payload: opened });
  };

  const toggleOpened = () => {
    dispatch({ type: LAYOUT_TOGGLE });
  };

  return (
    <LayoutContext.Provider
      value={{ layout: state, dispatch, actions: { setOpened, toggleOpened } }}
    >
      <div className={classes.root}>{children}</div>
    </LayoutContext.Provider>
  );
};
