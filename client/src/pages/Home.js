import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Header from "../components/Header";

const Home = () => {
  return (
    <div>
      <Navbar />
      <Header />
      <Outlet />
    </div>
  );
};

export default Home;
