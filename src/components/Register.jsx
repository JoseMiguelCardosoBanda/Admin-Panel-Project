import React, { useState } from "react";
import { ThemeHand } from "../context/ThemeContext";
import { LoginHand } from "../context/LoginContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const toastLive = document.getElementById("liveToast");
  const toastBody = document.getElementById("body");
  const navigate = useNavigate();
  const { theme, setTheme } = ThemeHand();
  const { login, setLogin } = LoginHand();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPass] = useState("");
  const [toastType, setType] = useState(false);
  const registered_at = String(new Date());
  const last_login = "";
  const status = "Active";
  const validEmail = new RegExp(
    "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validEmail.test(email)) {
      axios
        .post("https://admin-panel-backend-five.vercel.app/register", {
          name,
          email,
          password,
          registered_at,
          last_login,
          status,
        })
        .then((res) => {
          if (res.data != "Error") {
            setType(false);
            showToast("User Registered Successfully!!");
          } else {
            setType(true);
            showToast("E-Mail Already Registered!");
          }
        })
        .catch((err) => {
          setType(true);
          showToast(err);
        });
    } else {
      setType(true);
      showToast("Invalid E-Mail!!");
    }
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
                Register
              </h1>
              <br />
              <form action="" onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="nameReg"
                    autoComplete="off"
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    placeholder="John X"
                    required
                  />
                  <label
                    className={!theme ? "" : "text-black"}
                    htmlFor="nameReg"
                  >
                    Full Name
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="emailReg"
                    autoComplete="off"
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    placeholder="name@example.com"
                    required
                  />
                  <label
                    className={!theme ? "" : "text-black"}
                    htmlFor="emailReg"
                  >
                    E-Mail
                  </label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="passReg"
                    autoComplete="off"
                    onChange={(e) => {
                      setPass(e.target.value);
                    }}
                    placeholder="Password"
                    required
                  />
                  <label
                    className={!theme ? "" : "text-black"}
                    htmlFor="passReg"
                  >
                    Password
                  </label>
                </div>
                <br />
                <div className="d-flex justify-content-center align-items-center">
                  <button type="submit" className="btn btn-success">
                    Register
                  </button>
                </div>
              </form>
            </div>
            <div className="toast-container position-fixed bottom-0 end-0 p-3">
              <div
                id="liveToast"
                className={
                  toastType ? "toast text-bg-danger" : "toast text-bg-success"
                }
                role="alert"
                aria-live="assertive"
                aria-atomic="true"
              >
                <div className="toast-header">
                  <strong className="me-auto">
                    {toastType ? "Warning" : "Success"}
                  </strong>
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

export default Register;
