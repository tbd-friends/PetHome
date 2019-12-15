import React from "react";
import { Router, Switch, Route, Link } from "react-router-dom";
import { History } from "history";

import AuthedRoute from "./components/router/AuthedRoute";
import UnauthedRoute from "./components/router/UnauthedRoute";

import { Header } from "./components/Header";
import { Sidebar, SidebarItemProps, SidebarProps } from "./components/Sidebar";
import { LoginPage } from "./pages/auth-pages/Login/LoginPages";
import { HomePage } from "./pages/Home/HomePage";
import { AnimalListPage } from "./pages/animals/List/AnimalListPage";
import { AnimalRegisterPage } from "./pages/animals/Register/AnimalRegisterPage";
import { AnimalDetailsPage } from "./pages/animals/Details/AnimalDetailsPage";
import { AnimalEditPage } from "./pages/animals/Edit/AnimalEditPage";
import { NotFoundPage } from "./pages/NotFound/NotFoundPage";

interface AppRouterProps {
  history: History<any>;
}

const sidebarLinks: SidebarProps = {
  items: [
    {
      name: "home",
      label: "Home",
      component: Link,
      to: "/",
      icon: "home"
    },
    {
      name: "animals",
      label: "Animals",
      icon: "pets",
      items: [
        {
          name: "animal-list",
          label: "List",
          component: Link,
          to: "/animal/list",
          icon: "note_add"
        },
        {
          name: "animal-register",
          label: "Register",
          component: Link,
          to: "/animal/register",
          icon: "note_add"
        }
      ]
    }
  ]
};

export const AppRouter: React.FC<AppRouterProps> = ({ history }) => {
  return (
    <Router history={history}>
      <div className="app">
        <AuthedRoute component={Header} redirect={false} showLoader={false} />
        <AuthedRoute
          redirect={false}
          showLoader={false}
          render={props => <Sidebar {...sidebarLinks} />}
        />
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
