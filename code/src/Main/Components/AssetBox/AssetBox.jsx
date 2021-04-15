import React, { useState, useEffect } from "react";
import axios from "axios";
import "../box.css";
import "./assetbox.css";

const AssetBox = (props) => {

  let [purprice, setpurprice] = useState("");

  useEffect(() => {
      let purprice = props.purchasePrice.reduce((a, b) => a + b);
      setpurprice(purprice.toFixed(2)); //returns a string with 2 numbers after decimal dot
  }, [props.purchasePrice])


  return (
    <div className="box assetbox" style={props.gradient}>
      <div id="left">
        <span className="label">Purchase Value</span>
        <span className="value">{props.isDataLoaded === 0 ? "$" + purprice : "Loading..."}</span>
      </div>
      <div id="right" style={{ marginLeft:"25px", borderLeft: "1px solid white", paddingLeft: "25px" }}>
        <span className="label">Average Return</span>
        <span className="value">{"-2.52" + "%"}</span>
      </div>
    </div>
  );
};

export default AssetBox;


 //let [userData, setUserData] = useState({ totalAssetVal: 0 });

  // useEffect(() => {
  //   const user = {
  //     uid: localStorage.getItem("userID"),
  //   };

  //   axios
  //     .post("http://localhost:80/evolve/fetchAssetValue.php", user)
  //     .then((res) => {
  //       setUserData({
  //         totalAssetVal: res.data.totalAssetVal == null ? 0 : res.data.totalAssetVal,
  //       });
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [userData.totalAssetVal]);