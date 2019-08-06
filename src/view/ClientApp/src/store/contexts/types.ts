import { AuthActionsTypes } from "../reducers/types";

export interface AuthState {}

export interface AuthProviderProps {
  reducer: React.Reducer<AuthState, AuthActionsTypes>;
  initialState: AuthState;
}
