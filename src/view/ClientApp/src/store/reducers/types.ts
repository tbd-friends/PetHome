export interface User {
  sid: string;
}

export enum AuthActions {
  SIGNIN = "@@auth/SIGNIN",
  SIGNIN_SUCCESS = "@@auth/SIGNIN_SUCCESS",
  SIGNIN_FAILED = "@@auth/SIGNIN_FAILED"
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
    user: User;
  };
}

export interface LoginFailedAction {
  type: typeof AuthActions.SIGNIN_FAILED;
  payload: {
    error: any;
  };
}

export type AuthActionsTypes =
  | LoginAction
  | LoginSuccessAction
  | LoginFailedAction;
