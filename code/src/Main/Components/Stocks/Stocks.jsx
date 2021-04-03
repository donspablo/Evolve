import React, { useState, useEffect } from "react";
import "../table.css";
import axios from "axios";

const Stocks = (props) => {

  //console.log(props.performUpdate);
  
  let [stockData, setStockData] = useState([]);
  let [loading, setLoading] = useState(1);

  let fetchStockData = async () => {

    const data = {
      uid: localStorage.getItem("userID"),
      assettype: 1, //to denote stock
    };

    //fetch stock data
    const STOCK_ENDPOINT = "http://localhost:80/evolve/selectAsset.php";

    try {
      let response = await axios.post(STOCK_ENDPOINT, data);

      if (response.status === 200) {
        if (!response.data.msg) {
          setStockData(response.data);
        }

        setLoading(0);
      } else {
        console.log("Some error occurred!");
      }

      if(props.performUpdate === 1){
        props.update(0);
      }

    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchStockData();
  }, [loading, props.performUpdate]);

  return (
    <div id="stocks">
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
          {loading == 0 &&
            stockData.map((stock, index) => {
              return (
                <tr
                  className="data"
                  key={index}
                  style={{ background: props.gradient }}
                >
                  <td>{stock.symbol}</td>
                  <td>{stock.stock_description}</td>
                  <td>{stock.quantity}</td>
                  <td>{"$" + stock.purchase_price}</td>
                  <td>current price</td>
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

export default Stocks;
