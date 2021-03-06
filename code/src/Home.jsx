import React from "react";
import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Loading from "./Utils/Loading";
import './home.css';
import logo from "./Images/logo_vector.png";
import { connect } from 'react-redux';
import d1 from './actions/showdetails1';
import d2 from './actions/showdetails2';

const Home = (props) => {
  //if already logged in, redirect directly to dashboard
  if (props.isAuthenticated) {
    let uid = localStorage.getItem("userID");
    return <Redirect to={`/dashboard/${uid}`} />;
  }

  return props.loading === true ? (
    <Loading />
  ) : (
    <div id="home">
      <div id="top-bar">
        <img
          src={logo}
          height="80"
          width="80"
          style={{
            opacity: "0",
            margin: "auto",
            marginLeft: "0",
            marginRight: "10px",
            animation: "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards"
          }}
        />
        <div id="evolve">EVOLVE</div>
        <Link to="/login" className="side">Login</Link>
        <Link to="/register" className="side">Register</Link>

      </div>
      <div id="home-content">
        <div id="c-box">
          <div id="inside-box">

            {/* Extra code 
            <p>{props.user + " " + props.details.stocks + " " + props.details.crypto}</p>

            <button onClick={props.user === "Indrajit" ? props.showdet2 : props.showdet1}>Change details</button>
            */}

            <p>Unable to afford a portfolio manager to maintain your investments? <br></br>Welcome to Evolve - the only online investment portfolio manager that you'll ever need.</p>
            <Link to="/register" id="reg-but">Become an Evolve member!</Link>
          </div>
        </div>
        <div id="right-img-holder">
          <img
            src={logo}
            id="right-img"
            style={{
              opacity: "0",
              margin: "auto",
              marginLeft: "0",
              animation: "icon-opacity-change 0.5s 0.25s cubic-bezier(.18,.87,.92,1) forwards"
            }}
          />
        </div>
      </div>
      <div id="home-footer">
        ?? Copyright {new Date().getFullYear()} - Evolve
      </div>
    </div>
  );
};


// these are the functions which are required to map the state to the props and dispatch actions to store

const mapStateToProps = state => ({
  ...state
});

const mapDispatchToProps = dispatch => ({
  showdet1: () => dispatch(d1),
  showdet2: () => dispatch(d2)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
