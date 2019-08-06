// This component is used to setup Application Level context providers
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./store/contexts/authContext";
import { authReducer } from "./store/reducers/authReducer";

export const Main: React.FC = () => (
  <Router>
    <AuthProvider reducer={authReducer} initialState={{}}>
      <App />
    </AuthProvider>
  </Router>
);
