import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
    const authContext = useContext(AuthContext);
  
    if (!authContext) throw new Error("useAuth must be used within AuthProvider");
  
    return authContext;
  };