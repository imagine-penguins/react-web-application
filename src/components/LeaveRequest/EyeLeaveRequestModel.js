




import React from 'react';
import "./EyeLeaveRequestModel.css";

import Modal from "react-modal";
import AppliedLeaveRequestCard from './AppliedLeaveRequestCard';

function EyeLeaveRequestModel(props) {
    return (
        <Modal
            id="EyeAppliedLeavesModel"
            isOpen={props.show}
            style={
                {
                    content: {
                        top: '35rem',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        // marginRight: '-50%',
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
            {console.log("props.data in eyeModal : ", props.data, props.index)}
            <AppliedLeaveRequestCard data={props.data} index={props.index} header={false} button={false} />
        </Modal>
    )
}

export default EyeLeaveRequestModel
