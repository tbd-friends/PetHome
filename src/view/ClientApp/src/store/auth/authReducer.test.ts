import { AuthState, AuthActions } from "./types";
import { authReducer } from "./authReducer";
import { User } from "oidc-client";

describe("authReducer", () => {
  const initialState: AuthState = {
    user: null,
    isLoadingUser: false,
    error: undefined
  };

  test("default case", () => {
    expect(authReducer(initialState, { type: "ANY" } as any)).toMatchObject(
      initialState
    );
  });

  test("loading user case", () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.LOADING_USER
      })
    ).toMatchObject({ ...initialState, isLoadingUser: true });
  });

  test("user found case", () => {
    const user: User = {
      id_token: "idtoken",
      session_state: 1,
      access_token: "access_token",
      refresh_token: "refresh_token",
      token_type: "token_type",
      scope: "scope",
      profile: 1,
      expires_at: 1,
      state: 1,
      expires_in: undefined,
      expired: false,
      scopes: ["scope"],
      toStorageString: () => {
        return "";
      }
    };

    expect(
      authReducer(initialState, {
        type: AuthActions.USER_FOUND,
        payload: {
          user
        }
      })
    ).toMatchObject({ ...initialState, user, isLoadingUser: false });
  });

  test("silent renew error case", () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.SILENT_RENEW_ERROR,
        payload: {
          error: new Error()
        }
      })
    ).toMatchObject({ ...initialState, user: null, isLoadingUser: false });
  });

  test("user expired case", () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.USER_EXPIRED
      })
    ).toMatchObject({ ...initialState, user: null, isLoadingUser: false });
  });

  test("session terminated case", () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.SESSION_TERMINATED,
        payload: { test: "some data" }
      } as any)
    ).toMatchObject({ ...initialState, user: null, isLoadingUser: false });
  });

  test("user signed out case", () => {
    expect(
      authReducer(initialState, {
        type: AuthActions.USER_SIGNED_OUT
      })
    ).toMatchObject({ ...initialState, user: null, isLoadingUser: false });
  });
});
