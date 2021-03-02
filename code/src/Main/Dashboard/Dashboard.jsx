import React, { useState, useEffect } from 'react';
import './dashboard.css';

const Dashboard = (props) => {

    const [count, setCount] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => setCount(count+1), 1000);
        return () => clearTimeout(timer);
    }, [count, setCount])

    return(
        <div id="dashboard">
            Welcome UserName
        </div>
    )
}

export default Dashboard;