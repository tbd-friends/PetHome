import { AnimalsState, AnimalsActions } from "./Animals/types";
import { AuthState, AuthActions } from "./Auth/types";

export interface AppState {
  auth: AuthState;
  animals: AnimalsState;
}

export type KnownActions = AuthActions | AnimalsActions;
