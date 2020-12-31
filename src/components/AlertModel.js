





import React, { useState } from 'react';
import "./AlertModel.css";
import axios from "./axios";
import ApiCalls from "./ApiCalls";
import Modal from "react-modal";

function AlertModel(props) {

    const [focusCss, setfocusCss] = useState({
        no: "focus",
        yes: ""
    });

    const applyChanges = () => {
        const aciveOrNot = props.checkedOrNot ? "Y" : "N";
        console.log("aciveOrNot :", aciveOrNot);
        axios.get(ApiCalls.listUsers + `?active=${aciveOrNot}`)
        .then(res => console.log("Successfully posted inactive/acive status inside AterModel :", res))
        .catch(e => console.log("error catched while inactive/acive status inside AterModel :", e));
        props.hide();
    }

    return (
        <>
            <Modal
                id="AlertModel"
                isOpen={props.show}
                style={
                    {
                        content: {
                            top: '32rem',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)',
                            backgroundColor: "transparent",
                            border: "none"
                        }
                    }
                }
            >
                {/* ....................Modal close Button...................................... */}
                <div className="modal-close-div">
                    <button className="modal-close-button" onClick={props.hide}>&times;</button>
                </div>

                {/* .......................Modal content....................................... */}
                <div className="inside-apply-modal inside-alert-modal ml-2">

                    <p>Are you Sure you want to make this user {props.checkedOrNot ? `Active` : `Inactive`}:</p>
                    <span className="d-flex eye-filter-button-bottom mt-3 pt-3">
                        <button className={`eye-filter-decline-button mr-5 ${focusCss.no}`} name="no" onClick={() => {setfocusCss({no: "focus"});props.hide();}}>No</button>
                        <button className={`eye-filter-approve-button mr-5 ${focusCss.yes}`} name="yes" onClick={() => {setfocusCss({yes: "focus"});applyChanges();}}>Yes</button>
                    </span>

                </div>

            </Modal>
        </>
    )
}

export default AlertModel
