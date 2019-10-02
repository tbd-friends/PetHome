import React from "react";
import { AuthActionTypes, AuthActions } from "./types";
import { AuthState } from "./types";

export const authReducer: React.Reducer<AuthState, AuthActionTypes> = (
    state,
    action
) => {
    console.log(action);
    switch (action.type) {
        case AuthActions.SIGNIN:
            return { ...state, user: undefined, error: undefined };
        case AuthActions.SIGNIN_SUCCESS:
            return { ...state, user: action.payload.user };
        case AuthActions.SIGNIN_FAILED:
            return { ...state, user: undefined, error: action.payload.error };
        case AuthActions.SIGNOUT:
            return { ...state, user: undefined, error: undefined };
        case AuthActions.SIGNOUT_SUCCESS:
            return { ...state, user: undefined, error: undefined };
        default:
            return state;
    }
};
