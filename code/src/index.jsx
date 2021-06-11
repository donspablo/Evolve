import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './Routes';
import { Provider } from "react-redux";
import configurestore from './store';

// Provider is used to tell the react app that we have a global state.

ReactDOM.render(
    <Provider store={configurestore()}>
        <Routes />
    </Provider>, 
    document.getElementById("root")
    )

