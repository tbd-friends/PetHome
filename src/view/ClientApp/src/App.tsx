import React from "react";
import { Route, Switch } from "react-router-dom";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { SignInPage } from "./pages/signin/SignInPage";
import { AdminArea } from "./areas/admin/AdminArea";
import { HomePage } from "./pages/home/HomePage";
import { NotFoundPage } from "./pages/notfound/NotFoundPage";
import { PrivateRoute } from "./components/PrivateRoute/PrivateRoute";

const baseTheme = createMuiTheme({});

export const App: React.FC = () => {
  return (
    <ThemeProvider theme={baseTheme}>
      <CssBaseline />
      <Switch>
        <Route path="/signin" exact component={SignInPage} />
        <Route path="/" exact component={HomePage} />
        <PrivateRoute path="/admin" component={AdminArea} />
        <Route component={NotFoundPage} />
      </Switch>
    </ThemeProvider>
  );
};
