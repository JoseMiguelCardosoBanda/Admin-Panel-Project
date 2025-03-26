import { createContext, useContext, useState } from "react";

const nameContext = createContext();

export default function NameContextProv({ children }) {
  const [name, setName] = useState("");
  return (
    <nameContext.Provider
      value={{
        name,
        setName,
      }}
    >
      {children}
    </nameContext.Provider>
  );
}

export const NameHand = () => {
  return useContext(nameContext);
};
