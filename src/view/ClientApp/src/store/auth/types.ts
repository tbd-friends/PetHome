import { User, UserManager } from "oidc-client";

export interface IAuthActions {
  signIn: (username: string, password: string) => void;
  signOut: () => void;
}

export interface IAuthContext {
  state: AuthState;
  userManager?: UserManager;
}

export interface AuthState {
  user: User | null;
  isLoadingUser: boolean;
  error?: Error;
}

export enum AuthActions {
  USER_EXPIRED = "@@auth/USER_EXPIRED",
  SILENT_RENEW_ERROR = "@@auth/SILENT_RENEW_ERROR",
  SESSION_TERMINATED = "@@auth/SESSION_TERMINATED",
  USER_EXPIRING = "@@auth/USER_EXPIRING",
  USER_FOUND = "@@auth/USER_FOUND",
  LOADING_USER = "@@auth/LOADING_USER",
  USER_SIGNED_OUT = "@@auth/USER_SIGNED_OUT",
  LOAD_USER_ERROR = "@@auth/LOAD_USER_ERROR"
}

export interface UserExpiredAction {
  type: typeof AuthActions.USER_EXPIRED;
}

export interface UserFoundAction {
  type: typeof AuthActions.USER_FOUND;
  payload: {
    user: User;
  };
}

export interface SilentRenewErrorAction {
  type: typeof AuthActions.SILENT_RENEW_ERROR;
  payload: {
    error: Error;
  };
}

export interface SessionTerminatedAction {
  type: typeof AuthActions.SESSION_TERMINATED;
}

export interface UserExpiringAction {
  type: typeof AuthActions.USER_EXPIRING;
}

export interface LoadingUserAction {
  type: typeof AuthActions.LOADING_USER;
}

export interface UserSignedOutAction {
  type: typeof AuthActions.USER_SIGNED_OUT;
}

export interface LoadUserErrorAction {
  type: typeof AuthActions.LOAD_USER_ERROR;
}

export type AuthActionTypes =
  | UserExpiredAction
  | UserFoundAction
  | SilentRenewErrorAction
  | SessionTerminatedAction
  | UserExpiringAction
  | LoadingUserAction
  | UserSignedOutAction
  | LoadUserErrorAction;
