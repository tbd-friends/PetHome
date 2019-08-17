import React from "react";
import { CallbackComponent } from "../../components/CallbackComponent/CallbackComponent";
import { RouteProps } from "react-router-dom";
import { RouterProps } from "react-router";

export const CallbackPage: React.FC<RouterProps> = ({ history }) => {
  return (
    <CallbackComponent
      successCallback={user => {
        history.push(user.state.returnUrl);
      }}
      errorCallback={error => {
        console.log(error);
        history.push("/");
      }}
    >
      <div>Redirecting...</div>
    </CallbackComponent>
  );
};
