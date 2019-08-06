import React from "react";
import { Header } from "../header/Header";
import { Sidebar } from "../sidebar/Sidebar";
import { Footer } from "../footer/Footer";

export const Layout: React.FC = ({ children }) => {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        {children}
      </div>
      <Footer />
    </div>
  );
};
