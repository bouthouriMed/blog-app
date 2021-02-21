import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { login } from "../../actions/auth";

function Login() {
  
  const [formData, setFormdata] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const dispatch = useDispatch()
  const {isAuthenticated} = useSelector(state => state.auth)

  const handleChange = (e) => {
    setFormdata({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(username, password));
    
  };

  if (isAuthenticated === true) {
    return <Redirect to="/blogs" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Sign into Your Account
      </p>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Username"
            name="username"
            value={username}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            value={password}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Login" />
      </form>
      <p className="my-1">
        Don't have an account? <Link to="/register">Sign Up</Link>
      </p>
    </Fragment>
  );
}



export default Login;
