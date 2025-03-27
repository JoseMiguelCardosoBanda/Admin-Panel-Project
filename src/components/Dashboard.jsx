import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginHand } from "../context/LoginContext";
import { ThemeHand } from "../context/ThemeContext";
import { IdHand } from "../context/IdContext";
import { VscUnlock, VscTrash } from "react-icons/vsc";
import axios from "axios";

function Dashboard() {
  const navigate = useNavigate();
  const { id, setId } = IdHand();
  const { login, setLogin } = LoginHand();
  const { theme, setTheme } = ThemeHand();
  const [users, setUsers] = useState([]);
  const [isCheckedAll, setIsCheckedAll] = useState(true);
  const [selectedUser, setSelected] = useState({
    usersID: [],
    response: [],
  });
  const checkBoxes = document.querySelectorAll(".form-check-input");

  function selectAllBoxes() {
    setIsCheckedAll(!isCheckedAll);
    for (let i = 0; i < checkBoxes.length; i++) {
      checkBoxes[i].checked = isCheckedAll;
      if (isCheckedAll) {
        selectedUser.usersID.push(checkBoxes[i].value);
        selectedUser.response.push(checkBoxes[i].value);
      } else {
        selectedUser.usersID = [];
        selectedUser.response = [];
      }
    }
  }

  const handleChange = (e) => {
    const { value, checked } = e.target;
    const { usersID } = selectedUser;

    if (checked) {
      setSelected({
        usersID: [...usersID, value],
        response: [...usersID, value],
      });
    } else {
      setSelected({
        usersID: usersID.filter((e) => e !== value),
        response: usersID.filter((e) => e !== value),
      });
    }
  };

  async function updateUser(newStatus) {
    const usersLength = selectedUser.response;
    const modal = document.getElementById("staticBackdrop");
    for (let x = 0; x < usersLength.length; x++) {
      if (usersLength[x] == id && newStatus === "Blocked") {
        showModal("The Current User Will Be Blocked. \nThe Page Will Reload.");
        modal.addEventListener("hidden.bs.modal", () => {
          axios.post("https://admin-panel-backend-five.vercel.app/update", {
            id: usersLength[x],
            status: newStatus,
          });
          navigate("/");
          setLogin(false);
        });
      } else {
        await axios.post("https://admin-panel-backend-five.vercel.app/update", {
          id: usersLength[x],
          status: newStatus,
        });
      }
    }
    getUsers();
  }

  async function deleteUser() {
    const usersLength = selectedUser.response;
    const modal = document.getElementById("staticBackdrop");
    for (let y = 0; y < usersLength.length; y++) {
      if (usersLength[y] == id) {
        showModal("The Current User Will Be Deleted. \nThe Page Will Reload.");
        modal.addEventListener("hidden.bs.modal", () => {
          axios.post("https://admin-panel-backend-five.vercel.app/delete", {
            id: usersLength[y],
          });
          navigate("/");
          setLogin(false);
        });
      } else {
        await axios.post("https://admin-panel-backend-five.vercel.app/delete", {
          id: usersLength[y],
        });
        getUsers();
      }
    }
    getUsers();
  }

  function showModal(message) {
    const createModal = new bootstrap.Modal(
      document.getElementById("staticBackdrop")
    );
    const modalBody = document.getElementById("modalB");
    modalBody.innerHTML = message;
    createModal.show();
  }

  const getUsers = async () => {
    axios
      .get("https://admin-panel-backend-five.vercel.app/users")
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      {login ? (
        <>
          <div className="d-flex justify-content-center align-items-center py-3">
            <h1>Users Control Panel</h1>
          </div>
          <div className="container text-center py-3">
            <div className="row">
              <div className="col">
                <button
                  className="btn btn-warning text-white"
                  onClick={() => updateUser("Blocked")}
                >
                  Block
                </button>
              </div>
              <div className="col">
                <button
                  className="btn btn-success"
                  onClick={() => updateUser("Active")}
                >
                  <VscUnlock />
                </button>
              </div>
              <div className="col">
                <button className="btn btn-danger" onClick={() => deleteUser()}>
                  <VscTrash />
                </button>
              </div>
            </div>
          </div>
          <br />
          <table
            className={
              !theme
                ? "table table-striped table-bordered"
                : "table table-dark table-striped table-bordered"
            }
          >
            <thead>
              <tr>
                <th scope="col">
                  <input
                    type="checkbox"
                    id="select-all"
                    onChange={selectAllBoxes}
                  />
                </th>
                <th scope="col">Name</th>
                <th scope="col">E-Mail</th>
                <th scope="col">Last Login</th>
                <th scope="col">Registered</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <th scope="row">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        name={user.id}
                        value={user.id}
                        id={user.id}
                        onChange={handleChange}
                      />
                    </div>
                  </th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.last_login}</td>
                  <td>{user.registered_at}</td>
                  <td>{user.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1
                    className="modal-title fs-5 text-dark"
                    id="staticBackdropLabel"
                  >
                    Attention!!
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div id="modalB" className="modal-body text-dark"></div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Understood
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        navigate("/")
      )}
    </>
  );
}

export default Dashboard;
