export interface LayoutState {
  drawerWidth: number;
  drawerOpened: boolean;
}

export enum LayoutActionTypes {
  SET_DRAWER_OPENED = "@@layout/SET_DRAWER_OPENED",
  TOGGLE_DRAWER = "@@layout/TOGGLE_DRAWER"
}

export interface SetDrawerOpenedAction {
  type: typeof LayoutActionTypes.SET_DRAWER_OPENED;
  payload: {
    opened: boolean;
  };
}

export interface ToggleDrawerAction {
  type: typeof LayoutActionTypes.TOGGLE_DRAWER;
}

export type LayoutActions = SetDrawerOpenedAction | ToggleDrawerAction;
