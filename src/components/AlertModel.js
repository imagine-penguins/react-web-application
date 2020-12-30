





import React from 'react';
import Modal from "react-modal";

function AlertModel(props) {

    const applyChanges = () => {
        return true;
    }

    return (
        <>
            <Modal
                id="EyeAppliedLeavesModel"
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
                <div className="inside-alert-modal ml-2">

                    <p>Are you Sure you want to activate this user:</p>
                    <span className="d-flex eye-filter-button-bottom mt-3 pt-3">
                        <button className="eye-filter-decline-button mr-3" name="no" onClick={props.hide()}>No</button>
                        <button className="eye-filter-approve-button mr-5" name="yes" onClick={applyChanges}>Yes</button>
                    </span>

                </div>

            </Modal>
        </>
    )
}

export default AlertModel
