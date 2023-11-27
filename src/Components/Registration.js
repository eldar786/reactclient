import React, { useState } from "react";
import { Form, Alert } from "react-bootstrap";
import Login from "./Login";

function Registration() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [flag, setFlag] = useState(false);
  const [login, setLogin] = useState(true);
  
  function handleFormSubmit(e) {
    e.preventDefault();

    if (!email || !password) {
      setFlag(true);
    } else {
      setFlag(false);
      localStorage.setItem("storedEmail", JSON.stringify(email));
      localStorage.setItem("storedPassword",JSON.stringify(password));
      console.log("Saved in Local Storage");

      setLogin(!login);
    }
  }

  function handleClick() {
    setLogin(!login);
  }

  return (
        <div>
          {" "}
          {login ? (
            <form onSubmit={handleFormSubmit}>
              <h3>Register</h3>

              <div className="form-group">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-dark btn-lg btn-block">
                Register
              </button>
              <br />
              <button type="button" onClick={handleClick} className="forgot-password text-right link-btn">
                Already registered{" "}log in?
              </button>
              {flag && (
                <Alert color="primary" variant="danger">
                  Please fill every Field!
                </Alert>
              )}
            </form>
          ) : (
            <Login />
          )}
        </div>
  );
}

export default Registration;
