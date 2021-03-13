//https://www.techiediaries.com/react-formdata-file-upload-multipart-form-tutorial/

import React, { useState, useEffect } from 'react';
import './topbar.css';

const TopBar = (props) => {

    return(
        <div id="topbar">
            Welcome {props.user.name}
            <img id="dp" src="https://thisisindrajit.github.io/portfolio/static/media/logo.d701fbb4.png" alt="Display Picture" />
        </div>
    )
}

export default TopBar;