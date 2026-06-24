import { createContext, useContext, useState, useEffect } from "react";
import * as authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("happytails_user");
    const token = localStorage.getItem("happytails_token");
    if (stored && token) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    const data = await authService.login(credentials);
    localStorage.setItem("happytails_token", data.token);
    localStorage.setItem("happytails_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const signup = async (payload) => {
    const data = await authService.signup(payload);
    localStorage.setItem("happytails_token", data.token);
    localStorage.setItem("happytails_user", JSON.stringify(data));
    setUser(data);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("happytails_token");
    localStorage.removeItem("happytails_user");
    setUser(null);
  };

  const updateUserInStorage = (updated) => {
    const merged = { ...user, ...updated };
    localStorage.setItem("happytails_user", JSON.stringify(merged));
    setUser(merged);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signup, logout, updateUserInStorage, isAdmin: user?.role === "admin" }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
export default AuthContext;