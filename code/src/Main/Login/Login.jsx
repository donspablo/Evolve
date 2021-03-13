import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./login.css";
import axios from "axios";

const Login = (props) => {
  const [data, setData] = useState({ email: "", password: "" });

  let changeData = (e, type) => {
    setData({
      email: type === 1 ? e.target.value : data.email,
      password: type === 2 ? e.target.value : data.password,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO - Perform validation of email

    console.log(data.email + " " + data.password);

    const LOGIN_ENDPOINT = "http://localhost:80/evolve/login.php";

    try {
      let response = await axios.post(LOGIN_ENDPOINT, data);

      console.log(response.data);

      if (
        response.status === 200 &&
        response.data.jwt &&
        response.data.expireAt
      ) {
        let jwt = response.data.jwt;
        let expire_at = response.data.expireAt;

        localStorage.setItem("access_token", jwt);
        localStorage.setItem("expire_at", expire_at);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="login">
      <div id="holder">
        <form onSubmit={(e) => handleSubmit(e)}>
          <span id="label">Login into Evolve</span>

          {/*Vertical line*/}
          <div
            style={{
              height: "0.5px",
              backgroundColor: "#14CCCC",
              width: "40vw",
              margin: "25px",
            }}
          ></div>

          <input
            type="text"
            name="email"
            value={data.email}
            placeholder="Email"
            onChange={(e) => changeData(e, 1)}
            spellCheck="false"
            required
          />
          <input
            type="password"
            name="password"
            value={data.password}
            placeholder="Password"
            onChange={(e) => changeData(e, 2)}
            required
          />
          <button type="submit">Login</button>

          <span id="new-user">
            New User? <Link to="/register">Click Here</Link> to register!
          </span>
        </form>
      </div>
    </div>
  );
};

export default Login;
