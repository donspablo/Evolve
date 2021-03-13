import React, { useState, useEffect } from 'react';
import TopBar from './TopBar/TopBar';
import Dashboard from './Dashboard/Dashboard';
import Search from './Search/Search';
import './content.css';

const Content = (props) => {

    // useEffect(() => {
    //     const timer = setTimeout(() => setCount(count+1), 1000);
    //     return () => clearTimeout(timer);
    // }, [count, setCount])

    return(
        <div id="content">
            <TopBar user={{name:"Indrajit"}} />
            <div id="page-render">
                {props.currentpage == 1 && <Dashboard />}
                {props.currentpage == 2 && <Search />}
            </div>
        </div>
    )
}

export default Content;