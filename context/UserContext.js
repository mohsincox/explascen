import React, { createContext, useState, useEffect } from "react";
import { getToken } from "@/services/tokenService";
import axiosInstance from "@/services/api";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await getToken();
        // await deleteToken();
        //console.log("token---",token);

        if (token) {
          const response = await axiosInstance.get("/user");
          //console.log("My User Context",response.data)
          setUser(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{ user, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
