import { MiddlewareAPI, Middleware, Dispatch } from "redux";
import { AuthActionTypes, AuthActions } from "./types";
import { AppState } from "../types";

export const authMiddleware = (): Middleware => {
  return ({ dispatch }: MiddlewareAPI<Dispatch<AuthActions>, AppState>) => (
    next: Dispatch
  ) => (action: AuthActions) => {
    next(action);

    switch (action.type) {
      case AuthActionTypes.LOGIN: {
        login(action.payload.username, action.payload.password)(dispatch);
      }
    }
  };
};

const login = (username: string, password: string) => async (
  dispatch: Dispatch<AuthActions>
) => {
  dispatch({
    type: AuthActionTypes.LOGIN_SUCCESS,
    payload: {
      user: {
        sid: "someid",
        token: "sometoken"
      }
    }
  });
};
