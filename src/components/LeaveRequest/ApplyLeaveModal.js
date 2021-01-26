




import React, { useState } from 'react';
import "./ApplyLeaveModal.css";
import CalanderApplyLeave from "./CalanderApplyLeave";
import axios from "../axios";
import ApiCalls from "../ApiCalls";
import Modal from "react-modal";
import CommonSaveChanges from '../CommonSaveChanges';


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
        // console.log("date : ", date);
        let startDateObj = new Date(date[0]["startDate"]);
        let endDateObj = new Date(date[0]["endDate"]);
        
        let startDate = (parseInt(startDateObj.getDate()) < 10 ? "0" + startDateObj.getDate() : startDateObj.getDate()) + "-" + (parseInt(startDateObj.getMonth() + 1) < 10 ? "0" + (startDateObj.getMonth() + 1) : (startDateObj.getMonth() + 1)) + "-" + startDateObj.getFullYear();
        let endDate = (parseInt(endDateObj.getDate()) < 10 ? "0" + endDateObj.getDate() : endDateObj.getDate()) + "-" + (parseInt(endDateObj.getMonth() + 1) < 10 ? "0" + (endDateObj.getMonth() + 1) : (endDateObj.getMonth() + 1)) + "-" + endDateObj.getFullYear();

        let dateToPost = startDate + "  to  " + endDate;
        console.log("dateToPost : ", dateToPost);
        
        setleaveInputDate(dateToPost);
    }

    const applyChanges = () => {
        let time = new Date();
        let date = leaveInputDate.split(" ");
        let startDate = date[0] + " " + (parseInt(time.getHours()) < 10 ? ("0" + time.getHours()) : time.getHours()) + ":" + (parseInt(time.getMinutes()) < 10 ? ("0" + time.getMinutes()) : time.getMinutes());
        let endDate = date[(date.length) - 1] + " " + (parseInt(time.getHours()) < 10 ? ("0" + time.getHours()) : time.getHours()) + ":" + (parseInt(time.getMinutes()) < 10 ? ("0" + time.getMinutes()) : time.getMinutes());
        // console.log("startDate, endDate inside applyChanges :", startDate, endDate);

        let payload = {
            "startDate": startDate,
            "endDate": endDate,
            "title": leaveInputTitle,
            "leaveReason": leaveInputDescription
            }

        console.log("payload for appling leave :", payload);
        axios.post(ApiCalls.leaveRequests, payload)
        .then(res => console.log(res))
        .catch(e => console.log(e));
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
                <button className="modal-close-button" onClick={() => {props.hide(); setleaveInputTitle(""); setleaveInputDate(""); setleaveInputDescription("");}}>&times;</button>
            </div>

            {/* .......................Modal content....................................... */}
            <div className="inside-apply-modal ml-2">
                
                {/* ............Title................ */}
                <div className="d-flex">
                    <input className="form-control apply-leave-modal-title mt-5" type="text" name="title" value={leaveInputTitle} onChange={(e) => {setleaveInputTitle(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, titleBlur : e.target.name}) : setonblurEvent({...onblurEvent, titleBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-first apply-blur-${onblurEvent.titleBlur}`}>Title</span>
                </div>
                
                {/* ............Calander................ */}
                <span className="d-flex apply-leave-calander">
                    <i className="fas fa-calendar-alt apply-leave-calander-icon pt-1" onClick={() => {setshowCalander(!showCalander);setonblurEvent({...onblurEvent, dateBlur : "calander"});}} />
                    <input className="form-control apply-leave-calander-input mt-5 mb-4" type="text" name="calander" value={leaveInputDate} onChange={(e) => {setleaveInputDate(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, dateBlur : e.target.name}) : setonblurEvent({...onblurEvent, dateBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-second apply-blur-${onblurEvent.dateBlur}`}>Time Period</span>
                    {showCalander && <div className=""><CalanderApplyLeave obtainDates={(date) => filterDate(date)} /></div>}
                </span>
                
                {/* ............Description................ */}
                <div className="d-flex">
                    <textarea className="form-control apply-leave-calander-description mt-5" name="description" value={leaveInputDescription} onChange={(e) => {setleaveInputDescription(e.target.value)}} onBlur={e => {e.target.value? setonblurEvent({...onblurEvent, descriptionBlur : e.target.name}) : setonblurEvent({...onblurEvent, descriptionBlur : ""})}} />
                    <span className={`apply-leave-modal-span span-third apply-blur-${onblurEvent.descriptionBlur}`}>Description</span>
                </div>

                {/* ............Apply Button................ */}
                <span className="d-flex eye-filter-button-bottom apply-leave-request-model mt-5 pt-3">
                    <button className="eye-filter-decline-button mr-3" onClick={() => setshow(true)}>Apply</button>
                    <CommonSaveChanges show={show} hide={() => setshow(false)} applySave={applyChanges} />
                </span>
                
            </div>
            
        </Modal>

        </>
    )
}

export default ApplyLeaveModal
