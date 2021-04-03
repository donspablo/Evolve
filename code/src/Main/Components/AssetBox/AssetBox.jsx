import React, { useState, useEffect } from "react";
import axios from "axios";
import "../box.css";
import "./assetbox.css";

const AssetBox = (props) => {
  let [userData, setUserData] = useState({ totalAssetVal: 0 });

  useEffect(() => {
    const user = {
      uid: localStorage.getItem("userID"),
    };

    axios
      .post("http://localhost:80/evolve/fetchAssetValue.php", user)
      .then((res) => {
        setUserData({
          totalAssetVal: res.data.totalAssetVal == null ? 0 : res.data.totalAssetVal,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData.totalAssetVal]);

  return (
    <div className="box assetbox" style={props.gradient}>
      <div id="left">
        <span className="label">Asset Value</span>
        <span className="value">{"$" + userData.totalAssetVal}</span>
      </div>
      <div id="right" style={{borderLeft:"1px solid white",paddingLeft:"25px"}}>
        <span className="label">Return</span>
        <span className="value">{"P" + "%"}</span>
      </div>
    </div>
  );
};

export default AssetBox;
