import React, { Fragment } from "react";
import { Link, Redirect } from "react-router-dom";

import { useSelector } from "react-redux";

function Landing() {


  const { isAuthenticated } = useSelector(state => state.auth)

  if (isAuthenticated) {
    return <Redirect to="/blogs" />;
  }

  const guestLinks = (
    <Fragment>
      <Link to="/register" className="btn btn-primary">
        Sign Up
      </Link>
      <Link to="/login" className="btn btn-light">
        Login
      </Link>
    </Fragment>
  );

  return (
    <Fragment>
      <section className="landing">
        <div className="dark-overlay">
          <div className="landing-inner">
            <h1 className="x-large">Blog Platform</h1>
            <p className="lead">
              Create your blog, share and connect with others
            </p>
            <div className="buttons">
              {!isAuthenticated ? guestLinks : null}
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}



export default Landing;
