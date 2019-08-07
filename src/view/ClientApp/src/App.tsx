import React from "react";
import { Route, Switch } from "react-router-dom";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";
import { SignInPage } from "./pages/signin/SignInPage";
import { ForgotPasswordPage } from "./pages/signin/forgotpassword/ForgotPasswordPage";
import { HomePage } from "./pages/home/HomePage";
import { AdminPage } from "./areas/admin/pages/AdminPage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";

import "./App.css";

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignInPage} />
      <Route path="/forgotpassword" exact component={ForgotPasswordPage} />
      <Route path="/" exact component={HomePage} />
      <PrivateRoute path="/admin" exact component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};
