import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { History } from "history";

import AuthedRoute from "./components/router/AuthedRoute";
import UnauthedRoute from "./components/router/UnauthedRoute";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { LoginPage } from "./pages/auth-pages/Login/LoginPages";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";
import { HomePage } from "./pages/Home/HomePage";
import { AnimalListPage } from "./pages/animals/List/AnimalListPage";
import { AnimalRegisterPage } from "./pages/animals/Register/AnimalRegisterPage";
import { AnimalDetailsPage } from "./pages/animals/Details/AnimalDetailsPage";
import { AnimalEditPage } from "./pages/animals/Edit/AnimalEditPage";

interface AppRouterProps {
  history: History<any>;
}

export const AppRouter: React.FC<AppRouterProps> = ({ history }) => {
  return (
    <Router history={history}>
      <div className="app">
        <AuthedRoute component={Header} redirect={false} showLoader={false} />
        <AuthedRoute component={Sidebar} redirect={false} showLoader={false} />
        <Switch>
          <AuthedRoute component={HomePage} exact path="/" />
          <AuthedRoute component={AnimalListPage} exact path="/animal/list" />
          <AuthedRoute
            component={AnimalRegisterPage}
            exact
            path="/animal/register"
          />
          <AuthedRoute
            component={AnimalDetailsPage}
            exact
            path="/animal/details/:animalId"
          />
          <AuthedRoute
            component={AnimalEditPage}
            exact
            path="/animal/edit/:animalId"
          />
          <UnauthedRoute component={LoginPage} exact path="/login" />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};
