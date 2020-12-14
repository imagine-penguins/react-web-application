




import React, { useState } from 'react';
import "./ApplyLeaveModal.css";
import CalanderApplyLeave from "./CalanderApplyLeave";

import Modal from "react-modal";

function ApplyLeaveModal(props) {

    const [leaveInputTitle, setleaveInputTitle] = useState("");
    const [leaveInputDate, setleaveInputDate] = useState("");
    const [leaveInputDescription, setleaveInputDescription] = useState("");

    // ................Show Calander.............................
    const [showCalander, setshowCalander] = useState(false);


    const [onblurEvent, setonblurEvent] = useState({
        titleBlur: "",
        dateBlur : "",
        descriptionBlur : ""
    });


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
            <div className="inside-apply-modal ml-2">
                <div className="d-flex">
                    <input className="form-control apply-leave-modal-title mt-5" type="text" name="title" value={leaveInputTitle} onChange={(e) => {setleaveInputTitle(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, titleBlur : e.target.name}) : setonblurEvent({...onblurEvent, titleBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-first apply-blur-${onblurEvent.titleBlur}`}>Title</span>
                </div>
                
                <span className="d-flex apply-leave-calander">
                    <i className="fas fa-calendar-alt apply-leave-calander-icon pt-1" onClick={() => setshowCalander(!showCalander)} />
                    <input className="form-control apply-leave-calander-input mt-5 mb-4" type="text" name="calander" value={leaveInputDate} onChange={(e) => {setleaveInputDate(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, dateBlur : e.target.name}) : setonblurEvent({...onblurEvent, dateBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-second apply-blur-${onblurEvent.dateBlur}`}>Time Period</span>
                    {showCalander && <div className=""><CalanderApplyLeave obtainDates={(date) => setleaveInputDate(date)} /></div>}
                </span>
                <div className="d-flex">
                    <textarea className="form-control apply-leave-calander-description mt-5" name="description" value={leaveInputDescription} onChange={(e) => {setleaveInputDescription(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, descriptionBlur : e.target.name}) : setonblurEvent({...onblurEvent, descriptionBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-third apply-blur-${onblurEvent.descriptionBlur}`}>Description</span>
                </div>
                <span className="d-flex eye-filter-button-bottom apply-leave-request-model mt-5 pt-3">
                    <button className="eye-filter-decline-button mr-3">Apply</button>
                </span>
                
            </div>

        </Modal>

        </>
    )
}

export default ApplyLeaveModal
