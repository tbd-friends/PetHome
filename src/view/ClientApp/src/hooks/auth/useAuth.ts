import React from "react";
import { AuthContext } from "../../store/contexts/AuthContext";
import { AuthActions } from "../../store/reducers/types";

export const useAuth = () => {
  const [authContext, dispatch] = React.useContext(AuthContext);

  const signIn = (username: string, password: string): void => {
    //TODO: figure out api and flow
    dispatch &&
      dispatch({
        type: AuthActions.SIGNIN,
        payload: {
          username,
          password
        }
      });
  };

  return [authContext, { signIn }];
};
