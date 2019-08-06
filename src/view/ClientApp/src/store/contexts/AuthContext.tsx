import React, { useReducer } from "react";
import { AuthProviderProps, AuthState } from "./types";
import { AuthActionsTypes } from "../reducers/types";

export const AuthContext = React.createContext<
  [AuthState, React.Dispatch<AuthActionsTypes>] | []
>([]);

export const AuthProvider: React.FC<AuthProviderProps> = ({
  reducer,
  initialState,
  children
}) => {
  return (
    <AuthContext.Provider value={useReducer(reducer, initialState)}>
      {children}
    </AuthContext.Provider>
  );
};
