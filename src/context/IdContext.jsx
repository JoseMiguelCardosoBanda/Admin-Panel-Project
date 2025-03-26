import { createContext, useContext, useState } from "react";

const idContext = createContext();

export default function IdContextProv({ children }) {
  const [id, setId] = useState("");
  return (
    <idContext.Provider
      value={{
        id,
        setId,
      }}
    >
      {children}
    </idContext.Provider>
  );
}

export const IdHand = () => {
  return useContext(idContext);
};
