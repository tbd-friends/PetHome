import { MiddlewareAPI, Middleware, Dispatch } from "redux";
import { AuthActionTypes, AuthActions, User } from "./types";
import { AppState } from "../types";
import { AuthClient } from "../../utils/pethome.api";

export const authMiddleware = (): Middleware => {
  return ({ dispatch }: MiddlewareAPI<Dispatch<AuthActions>, AppState>) => (
    next: Dispatch
  ) => (action: AuthActions) => {
    next(action);

    switch (action.type) {
      case AuthActionTypes.LOGIN: {
        login(action.payload.username, action.payload.password)(dispatch);
      }
      case AuthActionTypes.LOGOUT: {
        logout();
      }
    }
  };
};

const login = (username: string, password: string) => async (
  dispatch: Dispatch<AuthActions>
) => {
  // TODO: verify generated AuthClient, probably needs re produces attribute
  fetch("api/auth/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: username,
      password: password
    })
  })
    .then(response => {
      if (response.status === 200) {
        return response.text();
      }

      throw "Invalid username or password";
    })
    .then(token => {
      localStorage.setItem("auth", token);
      dispatch({
        type: AuthActionTypes.LOGIN_SUCCESS,
        payload: {
          user: {
            sid: "someId",
            token
          }
        }
      });
    })
    .catch(status => {
      dispatch({
        type: AuthActionTypes.LOGIN_FAILED,
        payload: { error: status }
      });
    });
};

const logout = () => {
  localStorage.removeItem("auth");
};
