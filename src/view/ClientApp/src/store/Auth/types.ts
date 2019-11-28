export interface AuthState {
  user?: any;
}

export enum AuthActionTypes {
  LOGIN = "@@auth/LOGIN",
  LOGOUT = "@@auth/LOGOUT"
}

export interface LoginAction {
  type: typeof AuthActionTypes.LOGIN;
  payload: {
    username: string;
    password: string;
  };
}

export interface LogoutAction {
  type: typeof AuthActionTypes.LOGOUT;
}

export type AuthActions = LoginAction | LogoutAction;
