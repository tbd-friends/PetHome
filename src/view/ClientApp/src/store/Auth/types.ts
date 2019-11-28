export interface User {
  sid: string;
  token: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  user?: User;
}

export enum AuthActionTypes {
  LOGIN = "@@auth/LOGIN",
  LOGOUT = "@@auth/LOGOUT",
  LOGIN_SUCCESS = "@auth/LOGIN_SUCCESS"
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

export interface LoginSuccessAction {
  type: typeof AuthActionTypes.LOGIN_SUCCESS;
  payload: {
    user: User;
  };
}

export type AuthActions = LoginAction | LogoutAction | LoginSuccessAction;
