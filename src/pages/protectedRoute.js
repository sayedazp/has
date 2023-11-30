import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoute = ({ children }) => {
  const {user} = useAuth();
  if (!user) {
    // user is not authenticated
    console.log("not authenticated")
    return <Navigate to="/" />;
  // }else{
  //   if (user.token == "admin"){
  //     return <Navigate to="/adminhome"/>
  //   }else{
  //     return <Navigate to="/clienthome"/>
  //   }
  }
  if (children.type.name == "AdminHome") {
    if (user.role == "admin"){
      return children
    }else{
      return <Navigate to="/" />
    }
  }
  if (children.type.name == "ClientHome") {
    if (user.role != "admin"){
      return children
    }else{
      return <Navigate to="/" />
    }
  }
  return children;
};
