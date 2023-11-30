import { createContext, useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const navigator = (data)=>{
    if (data.role == "admin"){
      console.log("navigateme")
      navigate("/adminhome");
    }else{
      navigate("/clienthome")
    }
  }
  const login = async (data) => {

    setUser(data);
    navigator(data);
  };

  // call this function to sign out logged in user
  const logout = (soc) => {
    soc.removeAllListeners("notify");
    soc.removeAllListeners("added-meeting");
    setUser(null);
    navigate("/", { replace: true });
  };
  const value = 
    {
      user,
      login,
      logout,
      navigator
    };
  return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
    // alert(AuthContext)
    // alert(useContext(AuthContext))
  return useContext(AuthContext);
};
