import React, { useState } from "react";
import { ThemeHand } from "../context/ThemeContext";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginHand } from "../context/LoginContext";
import { NameHand } from "../context/UserNameContext";
import { IdHand } from "../context/IdContext";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const { theme, setTheme } = ThemeHand();
  const { login, setLogin } = LoginHand();
  const { name, setName } = NameHand();
  const { id, setId } = IdHand();
  const last_login = String(new Date());
  const toastLive = document.getElementById("liveToast");
  const toastBody = document.getElementById("body");
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://admin-panel-backend-five.vercel.app/login", {
        email,
        password,
        last_login,
      })
      .then((res) => {
        if (
          res.data != "Blocked User!" &&
          res.data != "Wrong Credentials or Unexisting User!"
        ) {
          setLogin(true);
          res.data.map((e) => {
            setId(e.id);
            setName(e.name);
          });
          navigate("/dashboard");
        } else {
          showToast(res.data);
        }
      })
      .catch((err) => showToast(err));
  };

  function showToast(message) {
    toastBody.innerHTML = message;
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
    toastBootstrap.show();
  }

  return (
    <>
      {!login ? (
        <>
          <div className="d-flex justify-content-center align-items-center py-5">
            <div className="shadow-lg bg-secondary p-3 rounded w-25">
              <h1 className="d-flex justify-content-center align-items-center">
                Log In
              </h1>
              <br />
              <form action="" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="mailInput"
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="name@example.com"
                    required
                  />
                  <label
                    className={!theme ? "" : "text-black"}
                    htmlFor="mailInput"
                  >
                    E-mail Address
                  </label>
                </div>
                <div className="form-floating">
                  <input
                    type="password"
                    className="form-control"
                    id="passInput"
                    autoComplete="off"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    placeholder="Password"
                    required
                  />
                  <label
                    className={!theme ? "" : "text-black"}
                    htmlFor="passInput"
                  >
                    Password
                  </label>
                </div>
                <br />
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-primary">
                    Log In
                  </button>
                </div>
              </form>
              <br />
              <br />
              <p className="text-sm text-center">
                Not Registered Yet?{" "}
                <NavLink to="/register">Register Here</NavLink>
              </p>
            </div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
              <div
                id="liveToast"
                className="toast text-bg-danger"
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header">
                  <strong className="me-auto">Warning</strong>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="toast"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="toast-body" id="body"></div>
              </div>
            </div>
          </div>
        </>
      ) : (
        navigate("/dashboard")
      )}
    </>
  );
}

export default Login;
