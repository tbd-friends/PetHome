import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { History } from "history";

import AuthedRoute from "./components/router/AuthedRoute";
import UnauthedRoute from "./components/router/UnauthedRoute";
import { LoginPage } from "./pages/auth-pages/Login/LoginPages";
import { HomePage } from "./pages/Home/HomePage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { Header } from "./components/Header";

interface AppRouterProps {
  history: History<any>;
}

export const AppRouter: React.FC<AppRouterProps> = ({ history }) => {
  return (
    <Router history={history}>
      <div className="app">
        <AuthedRoute component={Header} redirect={false} showLoader={false} />
        <Switch>
          <AuthedRoute component={HomePage} exact path="/" />
          <UnauthedRoute component={LoginPage} exact path="/login" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};
