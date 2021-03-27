//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from 'react';
import './topbar.css';

const TopBar = (props) => {

    return(
        <div id="topbar">
            Welcome {localStorage.getItem("username")}
            <img id="dp" onClick={() => props.logout()} src="https://thisisindrajit.github.io/portfolio/static/media/logo.d701fbb4.png" alt="Display Picture" />
        </div>
    )
}

export default TopBar;