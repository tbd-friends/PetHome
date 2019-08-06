import { AuthActionTypes } from "../reducers/types";

export interface AuthState {}

export interface AuthProviderProps {
  reducer: React.Reducer<AuthState, AuthActionTypes>;
  initialState: AuthState;
}
