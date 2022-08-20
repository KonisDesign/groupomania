import React, { useState, useContext } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";


function Login() {
  const [role, setRole] = useState("visitor");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { setAuthState } = useContext(AuthContext);

  let history = useHistory();

  const login = () => {
    const data = { username: username, password: password, role: role };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
        history.push("../");
      } else {
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({
          username: response.data.username,
          id: response.data.id,
          role: response.data.role,
          status: true,
        });
        setRole(response.data.role);
        history.push("/");
      }
    });
  };

  return (
    <div>
      <div className="loginContainer">
        <label>Nom d'utilisateur</label>
        <input
          name="username"
          type="text"
          placeholder="Nom d'utilisateur"
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
        <label>Mot de passe</label>
        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <div>
          <button className="loginButton" type="submit" onClick={login}>
            {" "}
            Se connecter{" "}
          </button>
          {}
        </div>
      </div>
    </div>
  );
}

export default Login;