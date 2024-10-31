import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser")) || null
  );

  const [currentProject, setCurrentProject] = useState({
    _id: "",
    userId: "",
    title: "",
    description: "",
    budgetType: "",
    hourlyRateFrom: null,
    hourlyRateTo: null,
    fixedPrice: null,
    scopeDuration: "",
    scopeLevel: "",
    scopeHiring: "",
    attachments: [],
    tierPrice: null, // Add tierPrice property
  });

  const updateUser = (data="currentUser") => {
    setCurrentUser(data);
    localStorage.setItem("currentUser", JSON.stringify(data));
    
  };

  const updateProject = (data) => {
    setCurrentProject(data);
  };

  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{ currentUser, updateUser, currentProject, updateProject }}
    >
      {children}
    </AuthContext.Provider>
  );
};
