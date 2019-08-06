// This component is used to setup Application Level context providers
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { App } from "./App";

export const Main: React.FC = () => (
  <Router>
    <App />
  </Router>
);
