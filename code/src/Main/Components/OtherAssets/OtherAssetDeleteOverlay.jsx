import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OtherAssetDeleteOverlay = (props) => {


    let isunmounted = false;
    let [text, setText] = useState("Delete")

    let deleteOtherAsset = async () => {

        const data = {
            otherAssetTransactionID: props.otherAssettid,
            type: "3"
        }

        const DELETE_ENDPOINT = "http://localhost:80/evolve/addEditDelOtherAsset.php";

        try {
            let response = await axios.post(DELETE_ENDPOINT, data);

            if (response.status === 200 && !isunmounted) {
                console.log(response.data);
                props.startLoadingAgain(4, 1);
            } else {
                console.log(response.data.error);
            }

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        if (text === "Deleting...") {
            deleteOtherAsset();
        }

        return () => {
            isunmounted = true;
        };

    }, [text])

    return (
        <div id="delete-overlay" style={{ height: Math.max(220, (props.height + 10)) + "px" }}>
            <div id="delete-content">
                <span style={{ textAlign: "center", lineHeight: "1.2rem", fontSize: "1.1rem" }}>Do you really want to delete this asset?</span>
                <button className="delete-button" style={{ backgroundColor: "red", marginTop: "25px" }} onClick={text === "Delete" ? () => setText("Deleting...") : null}>{text}</button>
                <button className="delete-button" style={{ border: text === "Delete" ? "1px solid #14cccc" : "1px solid #ccc" }} onClick={text === "Delete" ? () => props.setOverlay(-1) : null}>Close</button>
            </div>
        </div>
    );
}

export default OtherAssetDeleteOverlay;
