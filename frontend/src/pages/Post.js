import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";


function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const { authState } = useContext(AuthContext);

  const adminRole = authState.role === "admin";

  let history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      console.log(response.data);
      setPostObject(response.data);
    });
  }, [id]);

  const deletePost = (id) => {
    axios.delete(`http://localhost:3001/posts/${id}`, {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then(() => {
        history.push("/");
      });
  };

  return (
    <Formik
    >
      <div className="postPage">
        <div className="leftSide">
          <div className="post postComment" id="individual">
            <div className="title">{postObject.title}</div>

            <div
              className="body"
              onDoubleClick={() => {
                if (
                  authState.username === postObject.username ||
                  adminRole === true
                ) {
                  history.push(`/updatepost/${id}`);
                }
              }}
            >
               <p> {postObject.postText}</p>
              {" "}
              <div>
                {postObject.image !== null && (
                  <img
                    className="big-thumbnail"
                    src={`http://localhost:3001/${postObject.image}`}
                    alt="img from a post"
                  />
                )}
              </div>
            </div>
            <div className="footer">
              de {postObject.username}
              {authState.username === postObject.username ||
              adminRole === true ? (
                <button
                  className="smallBtn"
                  onClick={() => {
                    deletePost(postObject.id);
                  }}
                >
                  {" "}
                  ❌
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
       {}
      </div>
    </Formik>
  );
}

export default Post;