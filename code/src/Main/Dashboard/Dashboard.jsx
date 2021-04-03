import React, { useState, useEffect } from "react";
import "./dashboard.css";
import defaultPageStyles from "../../Styles/defaultPageStyles";
import AssetBox from "../Components/AssetBox/AssetBox";
import AssetGraph from "../Components/AssetGraph/AssetGraph";
import AssetTypeBox from "../Components/AssetTypeBox/AssetTypeBox";
import Stocks from "../Components/Stocks/Stocks";
import StockForm from '../Components/Stocks/StockForm';
import Crypto from "../Components/Crypto/Crypto";
import Overlay from "../Components/Overlay/Overlay";

const Dashboard = (props) => {
  let assetTypes = ["Stocks", "Crypto", "Bonds", "Funds", "Others"];
  let [overlay, setOverlayType] = useState(0); //0 - not open, 1 - stocks, 2 - crypto
  let [update, setUpdate] = useState(0); //for updating stocks

  let handleUpdate = (update) => {
    //console.log(update);
    setUpdate(update);
  }

  let assettypeboxhandler = (type) => {
    console.log("Clicked " + type);
  };

  let openOverlay = (overlaytype) => {
    setOverlayType(overlaytype);
  };

  return (
    <>
      {overlay !== 0 && (
        <Overlay>
          {/*Stock Form*/}
          {overlay === 1 && (
            <div id="box">
              <svg
                id="close"
                onClick={() => openOverlay(0)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2743L19.25 12.2743"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <StockForm border="1px solid #da77d6" update={handleUpdate} overlayhandle={openOverlay}/>
            </div>
          )}

          {/*Crypto Form*/}
          {overlay === 2 && (
            <div id="box">
              <svg
                id="close"
                onClick={() => openOverlay(0)}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.25 12.2743L19.25 12.2743"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10.2998 18.2987L4.2498 12.2747L10.2998 6.24969"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Crypto form
            </div>
          )}
          <br />
        </Overlay>
      )}
      <div id="dashboard" style={defaultPageStyles.pageStyle}>
        <div id="top">
          <div className="left-grid">
            <AssetBox
              gradient={{
                background:
                  "linear-gradient(129.95deg, #F82C8E 0.74%, #A90C61 100%)",
              }}
            />
          </div>
          <div className="right-grid">
            <AssetGraph
              gradient={{
                background:
                  "linear-gradient(129.95deg, #404D58 0.74%, #5D7489 100%)",
              }}
            />
          </div>
        </div>

        <div className="label-grid">
          <div className="label-dashboard">Asset Types</div>
        </div>

        {/*Vertical line*/}

        <div
          style={{
            height: "0.5px",
            backgroundColor: "white",
            width: "100%",
            marginBottom: "30px",
          }}
        ></div>

        <div id="asset-type">
          {assetTypes.map((asset, index) => {
            return (
              <AssetTypeBox
                key={index}
                title={asset}
                onClick={() => assettypeboxhandler(asset)}
              />
            );
          })}
        </div>

        <div className="label-grid">
          <div className="label-dashboard">My Stocks</div>
          <div className="label-icon" onClick={() => openOverlay(1)}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 17.3485V32.6118"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.6389 24.9802H17.3611"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ marginLeft: "10px" }}>Add Stock</span>
          </div>
        </div>

        <div id="stocks">
          <Stocks gradient="linear-gradient(130deg, #da77d6 0.75%, #7526c5 100%)" performUpdate={update} update={handleUpdate} />
        </div>

        <div className="label-grid">
          <div className="label-dashboard">My Crypto</div>
          <div className="label-icon" onClick={() => openOverlay(2)}>
            <svg
              width="40"
              height="40"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M25 17.3485V32.6118"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M32.6389 24.9802H17.3611"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M34.7619 4.16666H15.2381C8.4325 4.16666 4.16663 8.9835 4.16663 15.8024V34.1976C4.16663 41.0165 8.41266 45.8333 15.2381 45.8333H34.7619C41.5873 45.8333 45.8333 41.0165 45.8333 34.1976V15.8024C45.8333 8.9835 41.5873 4.16666 34.7619 4.16666Z"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span style={{ marginLeft: "10px" }}>Add</span>
          </div>
        </div>

        <div id="crypto">
          <Crypto gradient="linear-gradient(129.95deg, #70A3E0 0.75%, #7924CD 100%)" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
