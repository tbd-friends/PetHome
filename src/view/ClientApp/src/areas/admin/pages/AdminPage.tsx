import React from "react";
import { Layout } from "../components/layout/Layout";
import { PetHomeProvider } from "../store/contexts/PetHomeContext";
import { petHomeReducer } from "../store/reducers/petHomeReducer";

export const AdminPage: React.FC = () => {
  return (
    <PetHomeProvider reducer={petHomeReducer} initialState={{}}>
      <Layout>Admin Page (routes for admin area</Layout>)
    </PetHomeProvider>
  );
};
