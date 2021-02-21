




import React from 'react';
import Modal from "react-modal";
import ApiCalls from '../ApiCalls';
import axios from '../axios';
import "./ConfirmTakeAttandanceModel.css";


function ConfirmTakeAttandanceModel(props) {

    const saveChanges = () => {
        if (props.attandanceHistory){

            let status = props.status ? "P" : "A" 

            // ......API call to Edit attandance.................
            axios.put(ApiCalls.saveAttendance + `/${props.attandanceId}/users/${props.id}/status/${status}`)
            .then(res => {
                console.log("Successfully Saved Attandance", res);
                alert("Attandance Edited Successfully.");
            })
            .catch(e => {
                console.log("Error occured while calling EditAttandance API :", e);
            });

            props.edited(props.attandanceId, props.status, props.index);

        }

        else{
            let saveData = props.toSaveData.map((el) => {
                return (
                    el.map((inEl) => {
                        return ({userId : inEl.id, status: inEl.status === "L" ? "L" : inEl.status ? "P" : "A"})
                    })
                )
            })
            let newData = [];
            saveData.forEach(el => {
                newData = newData.concat(el);
            })
            console.log("newData in Model is : ", newData);
            
            // ......API call to Save attandance.................
            axios.post(ApiCalls.saveAttendance, newData)
            .then(res => {
                console.log("Successfully Saved Attandance");
                alert("Attandance Saved Successfully.");
            })
            .catch(e => {
                console.log("Error occured while calling SaveAttandance API :", e);
            });
        }

        // ........Hidding the model..............
        props.hide();

    }


    return (
        <Modal
            id="SaveAttandanceModel"
            isOpen={props.show}
            onRequestClose={props.hide}
            style={
                {
                    content: {
                        left: '35%',
                        right: "auto",
                        top: "28%",
                        borderRadius: "1.2rem"
                    }
                }
            }
        >   
            <div className="">
                <div className="d-flex justify-content-end">
                    <button type="button" className="close" onClick={props.hide}>&times;</button>
                </div>
                <p className="some-text">Are you sure you want to {props.attandanceHistory  ? `edit this attandance :` : `save changes :`}</p>
                <div className="d-flex buttons-to-submit">
                    <button className="mr-5" onClick={props.hide} >No</button>
                    <button type="submit" onClick={saveChanges} >Yes</button>
                </div>
            </div>
        </Modal>
    )
}

export default ConfirmTakeAttandanceModel
