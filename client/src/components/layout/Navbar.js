import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { logout } from "../../actions/auth";

function Navbar({ history }) {
  
  const dispatch = useDispatch();

  const { isAuthenticated } = useSelector((state) => state.auth);

  const guestLinks = (
    <ul>
      <li>
        <Link to="/register">Register</Link>
      </li>

      <li>
        <Link to="/login">Login</Link>
      </li>
    </ul>
  );

  const authLinks = (
    <ul>
      <li>
        <Link to="/blogs">Blogs</Link>
      </li>

      <li>
        <a href="#!" onClick={() => dispatch(logout(history))}>
          <i className="fas fa-sign-out-alt" />{" "}
          <span className="hide-sm">Logout</span>
        </a>
      </li>
    </ul>
  );

  return (
    <Fragment>
      <nav className="navbar bg-dark">
        <h1>
          <Link to="/">
            <i className="fas fa-blog"></i> Blog
          </Link>
        </h1>
        {isAuthenticated ? authLinks : guestLinks}
      </nav>
    </Fragment>
  );
}

export default withRouter(Navbar);
