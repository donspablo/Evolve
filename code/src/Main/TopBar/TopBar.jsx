//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React from 'react';
import './topbar.css';

const TopBar = (props) => {

    return(
        <div id="topbar">
            Welcome {localStorage.getItem("username")}
            <img id="dp" onClick={() => props.logout()} src="https://pics.freeicons.io/uploads/icons/png/7947586491595453760-512.png" alt="Display Picture" />
        </div>
    )
}

export default TopBar;