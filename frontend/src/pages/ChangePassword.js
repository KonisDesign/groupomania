import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  let { id } = useParams();

  const changePassword = () => {
    axios
      .put(
        `http://localhost:3001/auth/changepassword/${id}`,
        {
          oldPassword: oldPassword,
          newPassword: newPassword,
        },
        {
          headers: {
            accessToken: localStorage.getItem("accessToken"),
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.data.error) {
          alert(response.data.error);
        } else {
          alert("Mot de passe changé");
        }
      });
  };

  return (
    <div className="password-form">
      <h1>Changer de mot de passe</h1>
      <div>
        <input
          className="password"
          type="text"
          placeholder="Actuel"
          onChange={(event) => {
            setOldPassword(event.target.value);
          }}
        />
        <input
          className="password"
          type="text"
          placeholder="Nouveau mot de passe"
          onChange={(event) => {
            setNewPassword(event.target.value);
          }}
        />
      </div>
      <button onClick={changePassword}>Sauvegarder</button>
    </div>
  );
}

export default ChangePassword;