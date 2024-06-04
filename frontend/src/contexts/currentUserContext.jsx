import { createContext } from "react";
import { useState } from "react";
export const CurrentUserContext = createContext(null);

function getInitialState(){
 const user = localStorage.getItem("currentUser");
 return user ? JSON.parse(user) : null
} 

const CurrentUserContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(getInitialState);

  const value = {
    currentUser,
    setCurrentUser
  };

  return (
    <CurrentUserContext.Provider value={value}>
      {children}
    </CurrentUserContext.Provider>
  );
};

export default CurrentUserContextProvider;
