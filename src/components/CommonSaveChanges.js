











import React, { useState } from 'react';
import Modal from "react-modal";

function CommonSaveChanges(props) {

    const [focusCss, setfocusCss] = useState({
        no: "focus",
        yes: ""
    });


    return (
        <>
            <Modal
                id="AlertModel"
                isOpen={props.show}
                style={
                    {
                        content: {
                            top: '28rem',
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

                    <p>Are you Sure you want to save changes :</p>
                    <span className="d-flex eye-filter-button-bottom mt-3 pt-3">
                        <button className={`eye-filter-decline-button mr-5 ${focusCss.no}`} name="no" onClick={() => {setfocusCss({no: "focus"}); props.hide();}}>No</button>
                        <button className={`eye-filter-approve-button mr-5 ${focusCss.yes}`} name="yes" onClick={() => {setfocusCss({yes: "focus"}); props.applySave(); props.hide();}}>Yes</button>
                    </span>

                </div>

            </Modal>
        </>
    )
}

export default CommonSaveChanges
