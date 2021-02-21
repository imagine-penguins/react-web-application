




import React, { useState } from 'react';
import "./ApplyLeaveModal.css";
import CalanderApplyLeave from "./CalanderApplyLeave";
import axios from "../axios";
import ApiCalls from "../ApiCalls";
import Modal from "react-modal";
import CommonSaveChanges from '../CommonSaveChanges';
import moment from "moment";

function ApplyLeaveModal(props) {

    const [show, setshow] = useState(false);
    const [leaveInputTitle, setleaveInputTitle] = useState("");
    const [leaveInputDate, setleaveInputDate] = useState("");
    const [leaveInputDescription, setleaveInputDescription] = useState("");
    // const [toPostDates, settoPostDates] = useState([]);

    // ................Show Calander.............................
    const [showCalander, setshowCalander] = useState(false);


    const [onblurEvent, setonblurEvent] = useState({
        titleBlur: "",
        dateBlur : "",
        descriptionBlur : ""
    });

    const filterDate = (date) => {

        let startDateObj = moment(date[0]["startDate"]).format("DD-MM-YYYY");
        let endDateObj = moment(date[0]["endDate"]).format("DD-MM-YYYY");

        let dateToPost = startDateObj + "  to  " + endDateObj;
        console.log("dateToPost : ", dateToPost);
        
        setleaveInputDate(dateToPost);
    }

    const applyChanges = () => {
        let time = new Date();
        let date = leaveInputDate.split(" ");
        let startDate = date[0] + " 00:00";
        let endDate = date[(date.length) - 1] + " 23:59";
        // console.log("startDate, endDate inside applyChanges :", startDate, endDate);

        let options = {
            "Sick Leave" : "SL",
            "Earned Leave" : "EL",
            "Comp. Off" : "CO",
            "Personal Leave" : "PL",
            "Vacation Leave" : "VL",
        }

        let leaveType = options[leaveInputTitle] ? options[leaveInputTitle] : "";

        let payload = {
            "title": leaveInputTitle,
            "startDate": startDate,
            "endDate": endDate,
            "leaveType": leaveType,
            "leaveReason": leaveInputDescription
            }

        console.log("payload for appling leave :", payload);
        axios.post(ApiCalls.leaveRequests, payload)
        .then(res => console.log("SuccessFully applied for leave", res))
        .catch(e => {console.log("There is something wrong with applying leave api :", e);alert("Something is wrong please enter valid date :");});

        setTimeout(function() {
            props.hide();
            props.triger();
        }, 1000);              //........Wait For 1sec...............
        
    }

    return (
        <>

        <Modal
            id="EyeAppliedLeavesModel"
            isOpen={props.show}
            style={
                {
                    content: {
                        top: '30rem',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        paddingBottom: "10rem",
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: "transparent",
                        border: "none"
                    }
                }
            }
        >
            {/* ....................Modal close Button...................................... */}
            <div className="modal-close-div">
                <button className="modal-close-button" onClick={() => {props.hide();setshowCalander(false);setleaveInputTitle(""); setleaveInputDate(""); setleaveInputDescription("");}}>&times;</button>
            </div>

            {/* .......................Modal content....................................... */}
            <div className="inside-apply-modal ml-2">
                
                {/* ............Title................ */}
                <div className="d-flex" onClick={() => setshowCalander(false)}>
                    <input className="form-control apply-leave-modal-title mt-5" type="text" list="titleSelect" name="title" value={leaveInputTitle} onChange={(e) => {setleaveInputTitle(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, titleBlur : e.target.name}) : setonblurEvent({...onblurEvent, titleBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-first apply-blur-${onblurEvent.titleBlur}`}>Title</span>
                    {/* ..............Options for Title.................. */}
                    <datalist id="titleSelect">
                        <option>Sick Leave</option>
                        <option>Earned Leave</option>
                        <option>Comp. Off</option>
                        <option>Personal Leave</option>
                        <option>Vacation Leave</option>
                    </datalist>
                </div>
                
                {/* ............Calander................ */}
                <span className="d-flex apply-leave-calander">
                    <i className="fas fa-calendar-alt apply-leave-calander-icon pt-1" onClick={() => {setshowCalander(!showCalander);setonblurEvent({...onblurEvent, dateBlur : "calander"});}} />
                    <input className="form-control apply-leave-calander-input mt-5 mb-4" type="text" name="calander" value={leaveInputDate} onClick={() => setshowCalander(!showCalander)} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, dateBlur : e.target.name}) : setonblurEvent({...onblurEvent, dateBlur : ""})}} readonly />
                    <span className={`apply-leave-modal-span span-second apply-blur-${onblurEvent.dateBlur}`}>Time Period</span>
                    {showCalander && <div className=""><CalanderApplyLeave obtainDates={(date) => filterDate(date)} /></div>}
                </span>
                
                {/* ............Description................ */}
                <div className="d-flex" onClick={() => setshowCalander(false)}>
                    <textarea className="form-control apply-leave-calander-description mt-5" name="description" value={leaveInputDescription} onChange={(e) => {setleaveInputDescription(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, descriptionBlur : e.target.name}) : setonblurEvent({...onblurEvent, descriptionBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-third apply-blur-${onblurEvent.descriptionBlur}`}>Description</span>
                </div>

                {/* ............Apply Button................ */}
                <span className="d-flex eye-filter-button-bottom apply-leave-request-model mt-5 pt-3" onClick={() => setshowCalander(false)}>
                    <button className="eye-filter-decline-button mr-3" onClick={() => {setshow(true);setshowCalander(false);}}>Apply</button>
                    <CommonSaveChanges show={show} hide={() => setshow(false)} applySave={applyChanges} />
                </span>
                
            </div>
            
        </Modal>

        </>
    )
}

export default ApplyLeaveModal
