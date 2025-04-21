import axios from "axios";
import { createContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [isLogIn, setIsLogin] = useState(false);

  const [userData, setUserData] = useState(false);

  // Convert to useCallback to prevent recreating on each render
  const getAuthState = useCallback(async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/auth/is-auth");
      if (data.success) {
        setIsLogin(true);
        setUserData(data.userData);
      }
    } catch (error) {
      toast.error(error.message); // Fixed typo: massage -> message
    }
  }, [backendUrl]);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/data");
      data.success ? setUserData(data.userData) : toast.error(data.message);
    } catch (error) {
      toast.error(error.message); // Fixed typo: massage -> message
    }
  };

  useEffect(() => {
    getAuthState();
  }, [getAuthState]); // Added getAuthState as a dependency

  const value = {
    backendUrl,
    isLogIn,
    setIsLogin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
