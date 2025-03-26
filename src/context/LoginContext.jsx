import { createContext, useContext, useState } from "react";

const loginContext = createContext();

export default function LoginContextProv({ children }) {
  const [login, setLogin] = useState(false);
  return (
    <loginContext.Provider
      value={{
        login,
        setLogin,
      }}
    >
      {children}
    </loginContext.Provider>
  );
}

export const LoginHand = () => {
  return useContext(loginContext);
};
