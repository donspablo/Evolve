import React, { useState, useEffect, useCallback } from 'react';
import './notes.css';
import { debounce } from "lodash";
import defaultPageStyles from '../../Styles/defaultPageStyles';
import axios from 'axios';


const Notes = (props) => {

    let isunmounted = false;
    let [notes, setNotes] = useState("");
    let [loading, setLoading] = useState(1);
    let [updating, setUpdating] = useState(0);
    let [error, setError] = useState(0);

    let fetchNotes = async () => {

        const data = {
            uid: localStorage.getItem("userID"),
        };

        //fetch notes
        const NOTES_ENDPOINT = "http://localhost:80/evolve/getNotes.php";

        try {
            let response = await axios.post(NOTES_ENDPOINT, data);
            //console.log(response);


            if (response.status === 200 && !isunmounted) {
                if (!response.data.msg) {

                    setNotes(response.data[0].user_notes);
                } else {
                    setNotes("");
                }

                setLoading(0);
            } else {
                console.log("Some error occurred!");
            }
        } catch (e) {
            console.log(e);
        }

    }

    // let Autosave = ({ currentnote }) => {

    //     const debouncedSave = useCallback(
    //       debounce(async (newnote) => {
    //         await updateNote(newnote);
    //       }, 5000),
    //       [],
    //     );
        
    //     // The magic useEffect hook. This runs only when `experimentData.name` changes.
    //     // We could add more properties, should we want to listen for their changes.
    //     useEffect(() => {
    //       if (currentnote) {
    //         debouncedSave(currentnote);
    //       }
    //       // debouncedSave is wrapped in a useCallback with an empty dependency list,
    //       // thus it will not change and in turn will not re-trigger this effect.
    //     }, [currentnote, debouncedSave]);
      
    //     // Do not display anything on the screen.
    //     return null;
    //   }

    let updateNote = async () => {

        setUpdating(1);

        const data = {
            uid: localStorage.getItem("userID"),
            note: notes
        };

        try {
            const response = await axios.post("http://localhost:80/evolve/updateNotes.php", data);
            
            if(response.status === 200 && response.data.msg === "Edited Note!"){
                setUpdating(0);
                setError(0);
                console.log(response.data.msg);
            }else{
                console.log(response);
                setUpdating(0);
                setError(1);
            }
        
        } catch (error) {
            setUpdating(0);
            setError(1);
            console.log(error);
        }
    }

    useEffect(() => {
        if (loading === 1) {
            fetchNotes();
        }

        return () => {
            isunmounted = true;
        };
    }, [loading])


    return (
        <div id="notes" style={defaultPageStyles.pageStyle}>
            
            <div className="label-grid" style={{ marginTop: "0" }}>
                <div className="label-dashboard">My Notes</div>
                <div id="right-note">
                {updating === 1 && <span className="note-msg">Updating...</span>}
                {error === 1 && <span className="note-msg" style={{color:"red"}}>Error while saving!</span>}
                <div className="label-icon save" onClick={() => updateNote()}>Save Note</div>
                </div>
            </div>
            <textarea placeholder="Enter your notes here..." value={loading === 1 ? "Loading..." : notes} onChange={(e) => setNotes(e.target.value)}></textarea>
            {/* <Autosave currentnote={notes} />   */}
        </div>
    )
}

export default Notes;