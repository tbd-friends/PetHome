import React from "react";
import { Provider } from "react-redux";
import { createBrowserHistory } from "history";
import { createMuiTheme, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";

import configureStore from "./store";
import { AppRouter } from "./AppRouter";

const { store } = configureStore();
const history = createBrowserHistory();

const baseTheme = createMuiTheme({});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={baseTheme}>
        <CssBaseline />
        <AppRouter history={history} />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
