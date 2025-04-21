import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";
import Home from "./pages/Home";
import Foods from "./pages/navbar/Foods";
import Drinks from "./pages/navbar/Drinks";
import Desserts from "./pages/navbar/Desserts";
import Cart from "./components/Cart";
import Login from "./pages/auths/Login";
import ResetPassword from "./pages/auths/ResetPassword";
import EmailVerify from "./pages/auths/EmailVerify";
import SearchGlobal from "./components/searchGlobal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer /> {/* Move this outside of Routes */}
      <Routes>
        <Route path="/Admin" element={<Admin />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ResetPassword" element={<ResetPassword />} />
        <Route path="/EmailVerify" element={<EmailVerify />} />

        {/* Layout route with Navbar */}
        <Route path="/" element={<Layout />} />
        <Route
          path="/Foods"
          element={
            <Layout>
              <Foods />
            </Layout>
          }
        />
        <Route
          path="/Drinks"
          element={
            <Layout>
              <Drinks />
            </Layout>
          }
        />
        <Route
          path="/Desserts"
          element={
            <Layout>
              <Desserts />
            </Layout>
          }
        />
        <Route
          path="/Cart"
          element={
            <Layout>
              <Cart />
            </Layout>
          }
        />
        <Route
          path="/searchGlobal"
          element={
            <Layout>
              <SearchGlobal />
            </Layout>
          }
        />
      </Routes>
    </>
  );
};

// Layout component with Navbar
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children || <Home />}
    </>
  );
};

export default App;
