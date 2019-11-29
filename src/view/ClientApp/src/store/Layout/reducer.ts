import { LayoutState, LayoutActions, LayoutActionTypes } from "./types";
import { Reducer } from "redux";

const initialState: LayoutState = { drawerWidth: 240, drawerOpened: false };

export const reducer: Reducer<LayoutState, LayoutActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case LayoutActionTypes.SET_DRAWER_OPENED: {
      return {
        ...state,
        drawerOpened: action.payload.opened
      };
    }
    case LayoutActionTypes.TOGGLE_DRAWER: {
      return {
        ...state,
        drawerOpened: !state.drawerOpened
      };
    }
    default:
      return state;
  }
};
