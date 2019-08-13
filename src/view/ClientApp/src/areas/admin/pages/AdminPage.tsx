import React from "react";
import { Layout } from "../components/layout/Layout";
import { PetHomeProvider } from "../store/contexts/PetHomeContext";
import { petHomeReducer } from "../store/reducers/petHomeReducer";
import { useAuth } from "../../../store/auth/useAuth";

export const AdminPage: React.FC = () => {
  const authCtx = useAuth();
  console.log(authCtx);
  return (
    <PetHomeProvider reducer={petHomeReducer} initialState={{}}>
      <Layout>Admin Page (routes for admin area</Layout>)
      <h1>{JSON.stringify(authCtx.state)}</h1>
      <button
        disabled={authCtx.state.user !== undefined}
        onClick={() => authCtx.actions.signIn("test", "test")}
      >
        SignIn
      </button>
      <button
        disabled={authCtx.state.user === undefined}
        onClick={() => authCtx.actions.signOut()}
      >
        SignOut
      </button>
    </PetHomeProvider>
  );
};
