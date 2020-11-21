import { createContext, useContext, useEffect, useState } from "react";
import { getUser, isAdmin, isAuthenticated } from "../api/auth";
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUser = async()=>{
        const fetchedUser = await getUser();
        if (fetchedUser) {
          setUser(fetchedUser);
        }
    }
    fetchUser()
  }, []);

  return (
    <AuthContext.Provider value={{ user: user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
