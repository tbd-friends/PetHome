import React, { useEffect } from "react";
import { useAuth } from "../../store/auth/useAuth";
import { User } from "oidc-client";

interface CallbackComponentProps {
  successCallback: (user: User) => void;
  errorCallback: (error: Error) => void;
}

export const CallbackComponent: React.FC<CallbackComponentProps> = ({
  children,
  successCallback,
  errorCallback
}) => {
  const authCtx = useAuth();

  useEffect(() => {
    const onRedirectSuccess = (user: User) => {
      console.log(user);
      successCallback(user);
    };

    const onRedirectError = (error: Error) => {
      errorCallback(error);
    };

    authCtx.userManager &&
      authCtx.userManager
        .signinRedirectCallback()
        .then(user => onRedirectSuccess(user))
        .catch(error => onRedirectError(error));
  }, [authCtx.userManager, successCallback, errorCallback]);

  return <>{React.Children.only(children)}</>;
};
