// This component is used to setup Application Level context providers
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";
import { AuthProvider } from "./store/auth/AuthContext";

const oidcSettings = {
  client_id: "331E5618-9985-43FC-BB76-90260B21E168",
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ""
  }/callback`,
  response_type: "token id_token",
  scope: "openid profile PetHomeApi",
  authority: "https://localhost:5001",
  silent_redirect_uri: `${window.location.protocol}//${
    window.location.hostname
  }${window.location.port ? `:${window.location.port}` : ""}/silent_renew.html`,
  automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true
};

export const Main: React.FC = () => (
  <Router>
    <AuthProvider settings={oidcSettings}>
      <App />
    </AuthProvider>
  </Router>
);
