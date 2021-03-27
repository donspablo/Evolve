import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Loading from "./Utils/Loading";

const Home = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let username = localStorage.getItem("username");
    return <Redirect to={`/dashboard/${username}`} />;
  }

  return props.loading === true ? (
    <Loading />
  ) : (
    <div>
      This is the Home
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
