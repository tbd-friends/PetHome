export interface IUser {
  sid: string;
  token: string;
}

export interface IAuthActions {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

export interface IAuthContext {
  state: AuthState;
  dispatch?: (action: AuthActionTypes) => void;
  actions: IAuthActions;
}

export interface AuthState {
  user: IUser | undefined;
  error: any | undefined;
}

export enum AuthActions {
  SIGNIN = "@@auth/SIGNIN",
  SIGNIN_SUCCESS = "@@auth/SIGNIN_SUCCESS",
  SIGNIN_FAILED = "@@auth/SIGNIN_FAILED",
  SIGNOUT = "@@auth/SIGNOUT",
  SIGNOUT_SUCCESS = "@@auth/SIGNOUT_SUCCESS",
  SIGNOUT_FAILED = "@@auth/SIGNOUT_FAILED"
}

export interface LoginAction {
  type: typeof AuthActions.SIGNIN;
  payload: {
    username: string;
    password: string;
  };
}

export interface LoginSuccessAction {
  type: typeof AuthActions.SIGNIN_SUCCESS;
  payload: {
    user: IUser;
  };
}

export interface LoginFailedAction {
  type: typeof AuthActions.SIGNIN_FAILED;
  payload: {
    error: any;
  };
}

export interface LogoutAction {
  type: typeof AuthActions.SIGNOUT;
}

export interface LogoutSuccessAction {
  type: typeof AuthActions.SIGNOUT_SUCCESS;
}

export type AuthActionTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction
  | LogoutAction
  | LogoutSuccessAction;
