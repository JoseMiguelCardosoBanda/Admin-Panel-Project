import { createContext, useContext, useState } from "react";

const themeContext = createContext();

export default function ThemeContextProv({ children }) {
  const [theme, setTheme] = useState(false);
  return (
    <themeContext.Provider
      value={{
        theme,
        setTheme,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}

export const ThemeHand = () => {
  return useContext(themeContext);
};
