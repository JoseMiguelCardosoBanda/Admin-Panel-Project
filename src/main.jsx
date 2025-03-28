import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import ThemeContextProv from "./context/ThemeContext.jsx";
import LoginContextProv from "./context/LoginContext.jsx";
import NameContextProv from "./context/UserNameContext.jsx";
import IdContextProv from "./context/IdContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ThemeContextProv>
    <LoginContextProv>
      <NameContextProv>
        <IdContextProv>
          <App />
        </IdContextProv>
      </NameContextProv>
    </LoginContextProv>
  </ThemeContextProv>
);
