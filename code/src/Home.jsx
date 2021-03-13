import React from 'react';
import { Link } from 'react-router-dom';

const App = (props) => {
    return(
        <div>
            This is the Home
            <Link to="/login">Login</Link>
        </div>
    )
}

export default App;