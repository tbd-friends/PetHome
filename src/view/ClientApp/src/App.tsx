import React from "react";
import { Route, Switch } from "react-router-dom";
import { SignInPage } from "./pages/signin/SignInPage";
import { AdminPage } from "./areas/admin/pages/AdminPage";
import { HomePage } from "./pages/home/HomePage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";

import "./App.css";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

export const App: React.FC = () => {
  return (
    <Switch>
      <Route path="/signin" exact component={SignInPage} />
      <Route path="/" exact component={HomePage} />
      <PrivateRoute path="/admin" exact component={AdminPage} />
      <Route component={NotFoundPage} />
    </Switch>
  );
};
