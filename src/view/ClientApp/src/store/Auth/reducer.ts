import { AuthState, AuthActions, AuthActionTypes } from "./types";
import { Reducer } from "redux";

const token = localStorage.getItem("auth");
const initialState: AuthState = token
  ? {
      isLoggedIn: !!token,
      user: {
        sid: "SomeId",
        token
      }
    }
  : { isLoggedIn: false };

export const reducer: Reducer<AuthState, AuthActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoggedIn: true,
        user: action.payload.user
      };
    }
    case AuthActionTypes.LOGOUT: {
      return {
        ...state,
        isLoggedIn: false,
        user: undefined
      };
    }
    default:
      return state;
  }
};
