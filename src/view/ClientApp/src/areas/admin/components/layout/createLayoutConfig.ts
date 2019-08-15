import { LayoutState } from "./types";

export const createLayoutConfig = (state?: LayoutState): LayoutState => {
  return {
    opened: false,
    drawerWidth: 240,
    ...state
  };
};
