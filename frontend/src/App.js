import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Profile from "./pages/Profile";
import ChangePassword from "./pages/ChangePassword";
import UpdatePost from "./pages/updatePost";

import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState({
    username: "",
    id: 0,
    role: "",
    status: false,
  });

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({ ...authState, status: false });
        } else {
          setAuthState({
            username: response.data.username,
            id: response.data.id,
            role: response.data.role,
            status: true,
          });
        }
      });
  }, []);

  const logout = () => {
    alert("Déconnexion");
    localStorage.removeItem("accessToken");
    setAuthState({ username: "", id: 0, role: "", status: false });
  };

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <Router>
          <div className="navbar">
            <div className="links">
              {!authState.status ? (
                <>
                  <Link to="/login">Connexion</Link>
                  <Link to="/registration">S'inscrire</Link>
                </>
              ) : (
                <>
                  <Link to="/">
                    <div>Groupomania</div>{" "}
                  </Link>
                  <Link to="/createpost">Publier</Link>
                </>
              )}
            </div>
            <div className="loggedInContainer">
              <h3>
                <Link to={`/profile/${authState.id}`}>
                  {" "}
                  {authState.username}{" "}
                </Link>
              </h3>
              {authState.status && (
                <button className="smallBtn" onClick={logout}>
                  🔒
                </button>
              )}
            </div>
          </div>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/createpost" exact component={CreatePost} />

            <Route
              path="/updatepost/:id"
              exact
              component={() => {
                return authState.status ? <UpdatePost /> : <Redirect to="/" />;
              }}
            />

            <Route path="/post/:id" exact component={Post} />
            <Route path="/registration" exact component={Registration} />
            <Route path="/login" exact component={Login} />

            <Route
              path="/profile/:id"
              exact
              component={() => {
                return authState.status ? <Profile /> : <Redirect to="/" />;
              }}
            />
            <Route
              path="/changepassword/:id"
              exact
              component={ChangePassword}
            />
            <Route path="*" exact component={PageNotFound} />
          </Switch>
        </Router>
      </AuthContext.Provider>
    </div>
  );
}

export default App;