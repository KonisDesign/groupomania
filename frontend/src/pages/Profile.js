import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Profile() {
  let { id } = useParams();
  let history = useHistory();
  const [username, setUsername] = useState("");
  const [listOfPosts, setListOfPosts] = useState([]);
  const { authState, setAuthState } = useContext(AuthContext);
  const [profileRole, setProfileRole] = useState("visitor");

  const adminRole = authState.role === "admin";
  console.log(adminRole);

  const deleteUser = () => {
    axios
      .delete(`http://localhost:3001/auth/deleteuser/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        console.log(response);
        setAuthState({ username: "", id: 0, role: "", status: false });
        history.push("/");
      });
  };

  useEffect(() => {
    axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
      setUsername(response.data.username);
      setProfileRole(response.data.role);
    });
    axios.get(`http://localhost:3001/posts/byuserId/${id}`).then((response) => {
      setListOfPosts(response.data);
    });
  }, [id]);

  return (
    <div className="profilePageContainer">
      <div className="basicInfo">
        {" "}
        <h1 className="accountInfoTitle">{username}</h1>
        <h5>ROLE :{profileRole}</h5>
          {authState.username === username ? (
            <button
              className="smallBtn"
              onClick={() => {
                history.push(`/changepassword/${id}`);
              }}
            >
              {" "}
              Changer mon mot de passe
            </button>
          ) : (
            ""
          )}
          {authState.username === username || adminRole === true ? (
            <button className="smallBtn" onClick={deleteUser}>
              Supprimer le compte
            </button>
          ) : (
            ""
          )}
      </div>
      <div className="listOfPosts">
        {listOfPosts.map((value, key) => {
          return (
            <div key={key} className="post">
              <div className="title"> {value.title} </div>
              <div
                className="body"
                onClick={() => {
                  history.push(`/post/${value.id}`);
                }}
              >
                <div>

                  {value.image ? (
                    <img
                      className="thumbnail"
                      src={`http://localhost:3001/${value.image}`}
                      alt="img from a post"
                    />
                  ) : (
                    ""
                  )}
                </div>
                <p>{value.postText}</p>
              </div>
              <div className="footer">
                <div className="username">{value.username}</div>
                <div className="buttons">
                  <label> {value.Likes.length}</label>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Profile;