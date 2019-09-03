import React from "react";
import { SignInForm, SignInFormValues } from "./forms/SignInForm";
import {
  RegisterUserForm,
  RegisterUserFormValues
} from "./forms/RegisterUserForm";
import { useAuth } from "../../store/auth/useAuth";
import { Redirect, RouteProps } from "react-router";

export const SignInPage: React.FC<RouteProps> = ({ location, ...props }) => {
  console.log(props);
  const returnUrl = (location && location.state.returnUrl) || "/";
  const authCtx = useAuth();
  const [currTab, setCurrTab] = React.useState(0);

  const handleSignIn = (values: SignInFormValues) => {
    authCtx.actions.signIn(values.username, values.password);
  };

  const handleRegisterUser = (values: RegisterUserFormValues) => {
    console.log(values);
  };

  const signInForm = (
    <SignInForm
      initialValues={{
        username: "manager@pethome.app",
        password: "I@mAflUffYBan8n#!"
      }}
      onSignIn={handleSignIn}
    />
  );

  const registerForm = (
    <RegisterUserForm
      initialValues={{ fullname: "", username: "", password: "" }}
      onRegisterUser={handleRegisterUser}
    />
  );

  const tabs = [registerForm, signInForm];

  if (authCtx.state.user) {
    return <Redirect to={returnUrl} />;
  }

  return (
    <div>
      <div>
        <button disabled={currTab === 0} onClick={() => setCurrTab(0)}>
          Register User
        </button>
        <button disabled={currTab === 1} onClick={() => setCurrTab(1)}>
          Sign In
        </button>
      </div>
      <div>{tabs[currTab]}</div>
      {authCtx.state.error && <div>{authCtx.state.error}</div>}
    </div>
  );
};
