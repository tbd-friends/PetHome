import React from "react";
import { Redirect } from "react-router-dom";

export const HomePage: React.FC = () => (
  <>
    <div>Redirecting to admin</div>
    <Redirect to="/admin" />
  </>
);
