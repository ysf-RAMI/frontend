import { createContext, useState, useEffect } from "react";

const UserAuth = createContext(null);

// eslint-disable-next-line react/prop-types
export default function UserAuthProvider({ children }) {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    const authData = localStorage.getItem("auth");

    try {
      // Check if authData exists and is a valid JSON string
      if (authData) {
        const parsedAuthData = JSON.parse(authData);

        // If it's a valid JWT, check if it starts with the expected string
        if (
          parsedAuthData &&
          parsedAuthData.token &&
          parsedAuthData.token.startsWith("eyJhbGciOi")
        ) {
          setAuth(parsedAuthData); // Set the auth if the token is valid
        } else {
          setAuth(null); // Clear if the data is invalid
        }
      }
    } catch (error) {
      console.error("Error parsing auth data:", error);
      setAuth(null); // Clear if there is an error
    }
  }, []);

  return (
    <UserAuth.Provider value={{ auth, setAuth }}>{children}</UserAuth.Provider>
  );
}

export { UserAuth };
