import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
  const backendUrl =
    process.env.REACT_APP_BACKEND_URL || "http://localhost:8000";

  const [isLogIn, setIsLogin] = useState(false);

  const [userData, setUserData] = useState(false);

  const value = {
    backendUrl,
    isLogIn,
    setIsLogin,
    userData,
    setUserData,
  };

  return (
    <AppContent.Provider value={value}>{props.children}</AppContent.Provider>
  );
};
