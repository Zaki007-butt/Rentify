import { createContext, useLayoutEffect } from "react";
import api from "../apis";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";
import axios from "axios";
import { BASE_URL } from "../config/config";
import { getUserProfile } from "../apis/user.api";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const emptyUser = { payload: null, access: null, refresh: null };
  const [user, setUser] = useLocalStorage("user", emptyUser);

  useLayoutEffect(() => {
    console.count("Setting up: Access token inspector...");

    // Pre set token for every api call
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && user.access
          ? `Bearer ${user.access}`
          : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [user.access]);

  useLayoutEffect(() => {
    console.count("Setting up: Refresh on expire inspector...");

    const refreshInterceptor = api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalReq = error.config;

        if (
          error.response.status === 401 ||
          error.response.data?.errors?.code === "token_not_valid" ||
          error.response.data?.code === "token_not_valid"
        ) {
          try {
            console.log("Trying refresh...");
            const res = await axios.post(`${BASE_URL}/refresh`, {
              refresh: user.refresh,
            });
            const userToken = res.data;

            setUser((prevUser) => ({
              ...prevUser,
              access: userToken.access,
            }));
            originalReq.headers.Authorization = `Bearer ${userToken.access}`;
            originalReq._retry = true;

            return api(originalReq);
          } catch (e) {
            console.log("Authentication failed:", e.message);
            setUser(emptyUser);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.response.eject(refreshInterceptor);
    };
  }, []);

  function signOutUser() {
    setUser(emptyUser);
  }

  function signInUser(tokens) {
    if (tokens) {
      const userData = {
        payload: jwtDecode(tokens.access),
        access: tokens.access,
        refresh: tokens.refresh,
      };
      setUser(userData);
      return userData.payload;
    } else {
      throw new Error("Cannot sign in user without token!");
    }
  }

  function currentUser() {
    return user.payload;
  }

  async function reloadUser() {
    const { data: updatedUser } = await getUserProfile();
    setUser((prevUser) => ({
      ...prevUser,
      payload: {
        ...prevUser.payload,
        name: updatedUser.name,
        email: updatedUser.email,
      },
    }));
  }
  return (
    <AuthContext.Provider
      value={{
        signInUser,
        signOutUser,
        currentUser,
        user: user.payload,
        reloadUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
