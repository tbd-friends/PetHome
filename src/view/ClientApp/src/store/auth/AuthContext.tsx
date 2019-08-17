import React, { useReducer, useEffect } from "react";
import { IAuthContext, AuthState } from "./types";
import { applyAuthMiddleware } from "./applyAuthMiddleware";
import { authReducer } from "./authReducer";
import { useAuthActions } from "./useAuthActions";
import { UserManagerSettings, User } from "oidc-client";
import { createUserManager } from "./authService/createUserManager";

const initialState: AuthState = {
  user: null,
  isLoadingUser: false,
  error: undefined
};

export const AuthContext = React.createContext<IAuthContext>({
  state: initialState
});

interface AuthProviderProps {
  settings: UserManagerSettings;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({
  settings,
  children
}) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const enhancedDispatch = applyAuthMiddleware(dispatch);

  const userManager = createUserManager(settings);
  const actions = useAuthActions(state, enhancedDispatch);

  const onUserLoaded = (user: User) => actions.userLoaded(user);

  const onSilentRenewError = (error: Error) => actions.silentRenewError(error);
  const onAccessTokenExpired = () => actions.accessTokenExpired();
  const onAccessTokenExpiring = () => actions.accessTokenExpiring();
  const onUserUnloaded = () => actions.userUnloaded();
  const onUserSignedOut = () => actions.userSignedOut();

  useEffect(() => {
    userManager.events.addUserLoaded(onUserLoaded);
    userManager.events.addSilentRenewError(onSilentRenewError);
    userManager.events.addAccessTokenExpired(onAccessTokenExpired);
    userManager.events.addAccessTokenExpiring(onAccessTokenExpiring);
    userManager.events.addUserUnloaded(onUserUnloaded);
    userManager.events.addUserSignedOut(onUserSignedOut);

    return () => {
      userManager.events.removeSilentRenewError(onSilentRenewError);
      userManager.events.removeUserLoaded(onUserLoaded);
      userManager.events.removeAccessTokenExpired(onAccessTokenExpired);
      userManager.events.removeAccessTokenExpiring(onAccessTokenExpiring);
      userManager.events.removeUserUnloaded(onUserUnloaded);
      userManager.events.removeUserSignedOut(onUserSignedOut);
    };
  }, [userManager]);

  return (
    <AuthContext.Provider value={{ state, userManager }}>
      {children}
    </AuthContext.Provider>
  );
};
