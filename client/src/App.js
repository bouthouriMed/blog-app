import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Landing from "./components/layout/Landing";
import Navbar from "./components/layout/Navbar";
import Blogs from "./components/blogs/Blogs";
import Blog from "./components/blog/Blog";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import { LOGOUT } from "./actions/type";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  useEffect(() => {
    // Check for token in localStorage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }

    store.dispatch(loadUser());

    // log user out from all tabs if they log out in one tab
    window.addEventListener("storage", () => {
      if (!localStorage.token) store.dispatch({ type: LOGOUT });
    });
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <ToastContainer position="top-center" />
          <Navbar />
          <Route exact path="/" component={Landing} />
          <div className="container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
              <PrivateRoute exact path="/blogs" component={Blogs} />
              <PrivateRoute exact path="/blogs/:id" component={Blog} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
