import React, { useState, useEffect } from "react";
import "../table.css";
import axios from "axios";

const Crypto = (props) => {
  let cryptodata = [
    {
      symbol: "BTC",
      description: "Bitcoin",
      quantity: "1",
      purchasePrice: "49517.06",
      currentPrice: "50517.06",
    },
  ];
  return (
    <div id="crypto">
      <table>
        <thead>
          <tr className="header">
            <th>Symbol</th>
            <th>Description</th>
            <th>Quantity</th>
            <th>Purchase Price</th>
            <th>Current Price</th>
            <th>Total Gain/Loss</th>
          </tr>
        </thead>
        <tbody>
          {cryptodata.map((crypto, index) => {
            return (
              <tr
                className="data"
                key={index}
                style={{ background: props.gradient }}
              >
                <td>{crypto.symbol}</td>
                <td>{crypto.description}</td>
                <td>{crypto.quantity}</td>
                <td>{"$" + crypto.purchasePrice}</td>
                <td>{"$" + crypto.currentPrice}</td>
                <td>calculate</td>
              </tr>
            );
          })}
          <tr className="total">
            <td></td>
            <td>TOTAL</td>
            <td></td>
            <td>total purchasePrice</td>
            <td>total currentPrice</td>
            <td>total gain/loss</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Crypto;
