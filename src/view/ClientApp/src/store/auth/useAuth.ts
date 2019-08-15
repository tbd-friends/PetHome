import React from "react";
import { AuthContext } from "./AuthContext";
import { IAuthContext } from "./types";

export const useAuth = (): IAuthContext => {
  const ctx = React.useContext(AuthContext);
  return ctx;
};
