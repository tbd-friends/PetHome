// This component is used to setup Application Level context providers
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./store/auth/AuthContext";

export const Main: React.FC = () => (
  <Router>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Router>
);
