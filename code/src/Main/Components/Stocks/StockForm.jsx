import React, { useState, useEffect } from "react";
import axios from "axios";
import "../form.css";

const StockForm = (props) => {
  const [data, setData] = useState({
    uid: localStorage.getItem("userID"),
    type: "1",
    symbol: "",
    desc: "",
    quantity: "",
    purchasePrice: "",
    purchaseDate: "",
  }); //type 1 is to denote to add stock to DB
  const [error, setError] = useState({ isSet: false, errorDesc: "" });

  let errorSet = (desc) => {
    setError({ isSet: true, errorDesc: desc });
  };

  let setMaxDate = () => {
    var dtToday = new Date();

    var month = dtToday.getMonth() + 1;
    var day = dtToday.getDate();
    var year = dtToday.getFullYear();

    if (month < 10) month = "0" + month.toString();
    if (day < 10) day = "0" + day.toString();

    var maxDate = year + "-" + month + "-" + day;
    return maxDate;
  };

  let changeData = (e, type) => {

    setData({
      uid: data.uid,
      type: "1",
      symbol: type === 1 ? e.target.value.toUpperCase() : data.symbol,
      desc: type === 2 ? e.target.value : data.desc,
      quantity: type === 3 ? e.target.value : data.quantity,
      purchasePrice: type === 4 ? e.target.value : data.purchasePrice,
      purchaseDate: type === 5 ? e.target.value : data.purchaseDate,
    });
  };

  let handleSubmit = async (e) => {
    e.preventDefault();

    //TO DO - Validate quantity, purchase Price is given as numbers, purchaseDate given in required format
    var numreg = new RegExp("^[0-9]+$");
    var decreg = new RegExp("^[0-9]+$|^[0-9]+.[0-9]+$");

    if (!numreg.test(data.quantity)) {
      errorSet("Please provide number input only for quantity!");
      document.getElementById("form-content").scrollTo(0, 0);
      Object.assign(data, { quantity: "" });
      return;
    }

    if (!decreg.test(data.purchasePrice)) {
      errorSet("Please provide number input only for purchase price!");
      document.getElementById("form-content").scrollTo(0, 0);
      Object.assign(data, { purchasePrice: "" });
      return;
    }


    const ADD_ENDPOINT = "http://localhost:80/evolve/addEditDelStock.php";
    //console.log(data);

    try {
      let response = await axios.post(ADD_ENDPOINT, data);
      //console.log(response);

      //there is an error
      if (response.data.error !== undefined) {
        console.log(response.data.error);
        document.getElementById("holder").scrollTo(0, 0);

        //resetting the form
        setData({
          uid: data.uid,
          type: "1",
          symbol: "",
          desc: "",
          quantity: "",
          purchasePrice: "",
          purchaseDate: "",
        });

        //setting the error
        errorSet(response.data.error);
      } else if (response.status === 200) {
        //console.log("Added Stock");
        console.log(response.data);
        props.update(1);
        props.overlayhandle(0);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div id="form-holder">
      <span className="form-title">Add Stock</span>
      {/*Vertical line*/}

      <div
        style={{
          height: "0.5px",
          backgroundColor: "#14CCCC",
          width: "85%",
          margin: "25px",
        }}
      ></div>

      <div id="form-content" style={{ borderLeft: props.border }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          {/*error box*/}
          {error.isSet && <div id="error">{error.errorDesc}</div>}

          <input
            type="text"
            title="Symbol"
            name="symbol"
            value={data.symbol}
            placeholder="Symbol (Required in caps)"
            onChange={(e) => changeData(e, 1)}
            spellCheck="false"
            required
          />
          <input
            type="text"
            title="Description"
            name="desc"
            value={data.desc}
            placeholder="Description (Required)"
            onChange={(e) => changeData(e, 2)}
            required
          />

          <input
            type="text"
            title="Quantity"
            name="quantity"
            value={data.quantity}
            placeholder="Quantity (Required)"
            onChange={(e) => changeData(e, 3)}
            spellCheck="false"
            required
          />
          <input
            type="text"
            title="Purchase Price"
            name="purchasePrice"
            value={data.purchasePrice}
            placeholder="Purchase Price in $ (Required)"
            onChange={(e) => changeData(e, 4)}
            required
          />
          <input
            type="date"
            title="Purchase Date"
            name="purchaseDate"
            max={setMaxDate()}
            value={data.purchaseDate}
            placeholder="Purchase Date (Required in the form DD/MM/YYYY)"
            onChange={(e) => changeData(e, 5)}
            required
          />

          <button type="submit">Add Stock</button>
        </form>
      </div>
    </div>
  );
};

export default StockForm;
