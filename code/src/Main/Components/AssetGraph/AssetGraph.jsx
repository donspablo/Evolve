import React, { useState, useEffect } from "react";
import "../box.css";
import "./assetgraph.css";

const AssetGraph = (props) => {
  
  return (
    <div className="box assetgraph" style={props.gradient}>
      Assets
    </div>
  );
};

export default AssetGraph;
