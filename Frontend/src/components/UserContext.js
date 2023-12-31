import React, { createContext, useContext, useState,useEffect  } from 'react';

// Create a new context for user data
const UserContext = createContext();

// Create a custom hook to access the UserContext
export const useUser = () => useContext(UserContext);

// Create a UserProvider component to wrap your application with
export const UserProvider = ({ children }) => {
  // Define user state and login/logout functions
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const[menulist,setMenuList]=useState(null);
  const[useremail,setUserEmail]=useState("");
  const[userorderid,setUserOrderId]=useState("");

  const setUserEmailValue = (email) => {
    setUserEmail(email);
    localStorage.setItem('useremail', JSON.stringify(email));
  };
  
  const setUserOrderIdValue = (orderid) => {
    setUserOrderId(orderid);
    localStorage.setItem('orderid', JSON.stringify(orderid));
  };
  

  useEffect(() => {
    // Check if the user is logged in by reading from localStorage
    const userLoggedIn = localStorage.getItem('isLoggedIn');
    if (userLoggedIn) {
      setIsLoggedIn(JSON.parse(userLoggedIn));
    }

    const useremail=localStorage.getItem('useremail');
    if(useremail){
      setUserEmailValue(JSON.parse(useremail));
    }

    const orderid=localStorage.getItem('orderid');
    if(orderid){
      setUserEmailValue(JSON.parse(orderid));
    }


  }, []);

  const login = () => {
    // Set the user as logged in and store in localStorage
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', JSON.stringify(true));
  };

  const logout = () => {
    // Set the user as logged out and remove from localStorage
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  // Provide the user data and functions to the context
  const contextValue = {
    isLoggedIn,
    login,
    logout,
    menulist,
    setMenuList,
    useremail,
    setUserEmailValue,
    userorderid,
    setUserOrderIdValue,

  
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
