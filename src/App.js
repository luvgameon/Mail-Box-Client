import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login/Login";
import Signup from "./components/login/Signup";

import { useSelector } from "react-redux";
import Mail from "./components/login/Mail/Mail";

function App() {
  // const auth = useContext(AuthContext);
  // const login = auth.islogin;
  const auth = useSelector((state) => state.auth);
  const login = auth.token == null ? false : true;
  console.log("login", auth.token, login);
  return (
    <>
      <Switch>
        <Route exact path="/">
          {login && <Redirect to="/Mail" />}
          {!login && <Signup />}
        </Route>

        <Route exact path="/login">
          {login && <Redirect to="/Mail" />}
          {!login && <Login />}
        </Route>
        <Route exact path="/Mail">
          <Mail />
        </Route>
      </Switch>
    </>
  );
}

export default App;
