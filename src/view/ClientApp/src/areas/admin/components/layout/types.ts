export interface LayoutState {
  opened: boolean;
  drawerWidth: number;
}

export interface ILayoutActions {
  setOpened: (opened: boolean) => void;
  toggleOpened: () => void;
}

export interface ILayoutContext {
  layout: LayoutState;
  dispatch?: (action: any) => void;
  actions: ILayoutActions;
}
