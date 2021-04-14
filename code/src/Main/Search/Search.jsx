import React, { useState, useEffect } from 'react';
import './search.css';
import { TradingViewEmbed, widgetType } from "react-tradingview-embed";
import defaultPageStyles from '../../Styles/defaultPageStyles';
import axios from 'axios';

const Search = (props) => {

    let isunmounted = false;

    let [loading, setLoading] = useState(1);
    let [stockData, setStockData] = useState([]);

    let fetchStockData = async () => {

        const data = {
            uid: localStorage.getItem("userID"),
            assettype: 1, //to denote stock
        };

        //fetch stock data
        const STOCK_ENDPOINT = "http://localhost:80/evolve/selectAsset.php";

        try {
            let response = await axios.post(STOCK_ENDPOINT, data);


            if (response.status === 200 && !isunmounted) {
                if (!response.data.msg) {

                    let symbolarray = []

                    response.data.map((stock) => {
                        symbolarray.push(stock.symbol)
                    })

                    setStockData(symbolarray);
                } else {
                    setStockData([]) //resetting stocks to none
                }

                setLoading(0);
            } else {
                console.log("Some error occurred!");
            }
        } catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        if (loading === 1) {
            fetchStockData();
        }

        return () => {
            isunmounted = true;
        };
    }, [loading])


    return (
        <div id="search" style={defaultPageStyles.pageStyle}>
            {loading === 0 ?
                <>
                    <div className="label-grid" style={{marginTop:"0"}}>
                        <div className="label-dashboard">Advanced Chart</div>
                    </div>
                    <div id="chart-holder-search">

                        <TradingViewEmbed
                            widgetType={widgetType.ADVANCED_CHART}
                            widgetConfig={{
                                colorTheme: "dark",
                                symbol: stockData.length > 0 ? stockData[0] : "AAPL",
                                style: "2",
                                width: "100%",
                                autosize: "true",
                                hideSideToolbar: "false",
                                details: "true"
                            }}
                        />
                    </div>
                    <div className="label-grid">
                        <div className="label-dashboard">Your Recent Stocks Overview</div>
                    </div>
                    {stockData.length > 0 ? <div id="chart-holder-stock">
                        {stockData.slice(0,10).map((stock, index) => {
                            return (
                                <div className="ticker-evolve" key={index}>
                                    <TradingViewEmbed
                                        widgetType={widgetType.MINI_CHART}
                                        widgetConfig={{
                                            symbol: stock,
                                            width: "100%",
                                            dateRange: "12M",
                                            colorTheme: "dark",
                                            autosize: "true"
                                        }}
                                    />
                                </div>
                            )
                        })}
                    </div>: <div className="msg" style={{margin:"0"}}>No Stocks found!</div>}

                </> : <div style={{width:"100%", textAlign:"center", margin:"auto"}}>Loading Data...</div>}

        </div>
    )
}

export default Search;