import React, { useState, useEffect } from 'react';
import './main.css';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard/Dashboard';

const Main = (props) => {

    let [curpage, setcurpage] = useState(1)

    //helper function to set new current page (page indicators -> 1 - dashboard, 2 - search, 3 - market, 4 - notes)
    const setnewcurpage = (page) => {
        setcurpage(page);
    }

    return(
        <div id="main">
        <Sidebar fillvalue={curpage} setpage={setnewcurpage}/>
        <Dashboard />
        </div>
    );
}

export default Main;