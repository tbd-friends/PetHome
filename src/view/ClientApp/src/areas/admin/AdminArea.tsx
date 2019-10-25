import React from "react";
import { Layout } from "./components/layout/Layout";
import { PetHomeProvider } from "./store/contexts/PetHomeContext";
import { petHomeReducer } from "./store/reducers/petHomeReducer";
import { createLayoutConfig } from "./components/layout/createLayoutConfig";
import { Header } from "./components/header/Header";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Content } from "./components/content/Content";
import { Footer } from "./components/footer/Footer";
import { Route } from "react-router";
import { PetsPage } from "./pages/pet/petList/PetsPage";
import { RegisterPetsPage } from "./pages/pet/registerPet/RegisterPetsPage";
import { HomePage } from "./pages/home/HomePage";

export const AdminArea: React.FC = () => {
  const layoutConfig = createLayoutConfig();
  return (
    <PetHomeProvider>
      <Layout initialState={layoutConfig}>
        <Header title="PetHome" />
        <Sidebar links={[]} />
        <Content>
          <Route path="/admin" exact component={HomePage} />
          <Route path="/admin/pets/list" exact component={PetsPage} />
          <Route
            path="/admin/pets/register"
            component={RegisterPetsPage}
            exact
          />
        </Content>
        <Footer />
      </Layout>
    </PetHomeProvider>
  );
};
