import React, { Fragment, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";

import { register } from "../../actions/auth";

function Register() {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    password2: "",
    roles: [],
  });

  const {
    firstname,
    lastname,
    username,
    address,
    email,
    password,
    password2,
    roles,
  } = formData;

  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !firstname |
      !lastname |
      !username |
      !address |
      !email |
      !password |
      !password2
    ) {
      return toast.error("All fields are required");
    }

    else if (password !== password2) {
      toast.error("Password doesn't match");
    } else {
      // Attempt to register
      dispatch(
        register(firstname, lastname, username, address, email, password, roles)
      );
    }
  };

  if (isAuthenticated === true) {
    return <Redirect to="/blogs" />;
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Lastname"
            name="lastname"
            value={lastname}
          />
        </div>
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
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Adresse"
            name="address"
            value={address}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
            minLength="6"
            value={password}
          />
        </div>
        <div className="form-group">
          <input
            onChange={handleChange}
            type="password"
            placeholder="Confirm Password"
            name="password2"
            minLength="6"
            value={password2}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
}

export default Register;
