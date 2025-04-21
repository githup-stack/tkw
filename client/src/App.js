import React from "react";
import { Route, Routes, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Login from "./pages/auths/Login";
import ResetPassword from "./pages/auths/ResetPassword";
import EmailVerify from "./pages/auths/EmailVerify";
import Home from "./pages/Home";
import Foods from "./pages/navbar/Foods";
import Drinks from "./pages/navbar/Drinks";
import Desserts from "./pages/navbar/Desserts";
import Cart from "./components/Cart";
import SearchGlobal from "./components/searchGlobal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/EmailVerify" element={<EmailVerify />} />

        <Route element={<NavbarLayout />}>
          <Route path="/Foods" element={<Foods />} />
          <Route path="/Drinks" element={<Drinks />} />
          <Route path="/Desserts" element={<Desserts />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/searchGlobal" element={<SearchGlobal />} />
        </Route>

        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

const NavbarLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
