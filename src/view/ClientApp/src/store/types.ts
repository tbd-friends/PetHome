import { AnimalsState, AnimalsActions } from "./Animals/types";
import { AuthState, AuthActions } from "./Auth/types";
import { LayoutState, LayoutActions } from "./Layout/types";

export interface AppState {
  auth: AuthState;
  layout: LayoutState;
  animals: AnimalsState;
}

export type KnownActions = AuthActions | LayoutActions | AnimalsActions;
