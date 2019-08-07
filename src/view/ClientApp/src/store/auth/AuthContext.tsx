import React, { useReducer } from "react";
import { IAuthContext, AuthState } from "./types";
import { applyAuthMiddleware } from "./applyAuthMiddleware";
import { authReducer } from "./authReducer";
import { useAuthActions } from "./useAuthActions";

const initialState: AuthState = {
  user: undefined,
  error: undefined
};

export const AuthContext = React.createContext<IAuthContext>({
  state: initialState,
  actions: {
    signIn: (username, password) => {},
    signOut: () => {}
  }
});

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const enhancedDispatch = applyAuthMiddleware(dispatch);

  const actions = useAuthActions(state, enhancedDispatch);

  return (
    <AuthContext.Provider
      value={{ state, dispatch: enhancedDispatch, actions }}
    >
      {children}
    </AuthContext.Provider>
  );
};
