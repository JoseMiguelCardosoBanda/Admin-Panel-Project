import React from "react";
import { FaLightbulb, FaRegLightbulb } from "react-icons/fa6";
import { AiFillHome } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ThemeHand } from "../context/ThemeContext";
import { LoginHand } from "../context/LoginContext";
import { NameHand } from "../context/UserNameContext";

function NavBar() {
  const navigate = useNavigate();
  const { theme, setTheme } = ThemeHand();
  const { login, setLogin } = LoginHand();
  const { name, setName } = NameHand();

  const changeTheme = () => {
    setTheme(!theme);
  };

  const LogOut = () => {
    setLogin(false);
    setName("");
    navigate("/");
  };

  const LogIn = () => {
    navigate("/login");
  };

  const goHome = () => {
    navigate("/");
  };

  const goDash = () => {
    navigate("/dashboard");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg shadow-lg bg-primary rounded">
        <div className="container-fluid">
          <a className="navbar-brand">
            <AiFillHome style={{ color: "#000" }} onClick={goHome} size={35} />
          </a>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <a className="nav-link">
                  {login ? (
                    <button
                      className="shadow btn btn-secondary"
                      onClick={goDash}
                    >
                      Dashboard
                    </button>
                  ) : null}
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link">
                  <button
                    className={
                      !theme ? "shadow btn btn-dark" : "shadow btn btn-light"
                    }
                    onClick={changeTheme}
                  >
                    {!theme ? <FaLightbulb /> : <FaRegLightbulb />}
                  </button>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-3">
            <h4 className="text-white">
              {login ? `Welcome Back ${name}!!` : ""}
            </h4>
          </div>
          <div className="col-auto">
            {login ? (
              <button className="shadow btn btn-danger" onClick={LogOut}>
                Log Out
              </button>
            ) : (
              <button className="shadow btn btn-success" onClick={LogIn}>
                Log In
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
