import { createContext, useLayoutEffect } from "react";
import api from "../apis";
import { jwtDecode } from "jwt-decode";
import useLocalStorage from "./useLocalStorage";

const AuthContext = createContext(undefined);

const AuthProvider = ({ children }) => {
  const emptyUser = { payload: null, access: null, refresh: null };
  const [user, setUser] = useLocalStorage("user", emptyUser);

  useLayoutEffect(() => {
    console.count("Setting up: Access token inspector...");

    // Pre set token for every api call
    const authInterceptor = api.interceptors.request.use((config) => {
      config.headers.Authorization =
        !config._retry && user.access ? `Bearer ${user.access}` : config.headers.Authorization;
      return config;
    });

    return () => {
      api.interceptors.request.eject(authInterceptor);
    };
  }, [user.access]);

  // useLayoutEffect(() => {
  //   console.count("Setting up: Refresh on expire inspector...");

  //   const refreshInterceptor = api.interceptors.response.use(
  //     (response) => response,
  //     async (error) => {
  //       const originalReq = error.config;

  //       if (
  //         (error.response.status === 403 || error.response.status === 401) &&
  //         error.response.data.success === false
  //       ) {
  //         try {
  //           const res = api.get("/refresh", {
  //             headers: {
  //               Authorization: `Bearer ${user.refresh}`,
  //             },
  //           });
  //           const userTokens = res.data.tokens;

  //           signInUser((prevUser) => ({
  //             ...prevUser,
  //             access: userTokens.access,
  //             refresh: userTokens.refresh,
  //           }));
  //           originalReq.headers.Authorization = `Bearer ${userTokens.access}`;
  //           originalReq._retry = true;

  //           return api(originalReq);
  //         } catch {
  //           setUser(emptyUser);
  //         }
  //       }

  //       return Promise.reject(error);
  //     }
  //   );

  //   return () => {
  //     api.interceptors.response.eject(refreshInterceptor);
  //   };
  // }, []);

  function signOutUser() {
    setUser(emptyUser);
  }

  function signInUser(tokens) {
    if (tokens) {
      setUser({
        payload: jwtDecode(tokens.access),
        access: tokens.access,
        refresh: tokens.refresh,
      });
    } else {
      throw new Error("Cannot sign in user without token!");
    }
  }

  function currentUser() {
    return user.payload;
  }

  return (
    <AuthContext.Provider value={{ signInUser, signOutUser, currentUser, user: user.payload }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
