





import React, { useState } from 'react';
import "./LoginAlertModel.css";
import Modal from "react-modal";
import axios from './axios';
import ApiCalls from './ApiCalls';


function LoginAlertModel(props) {

    const handelOk = () => {
        
        // .............Calling User Profile API.......................
        axios.get(ApiCalls.usersProfile)
        .then(res => {
            console.log("User Profile responce", res);
            // .....Parsing localStorage to set user Profile.........
            let localStorageData = JSON.parse(localStorage.getItem('storedData'));
            localStorageData.push(res.data);
            console.log("localStorage :", localStorageData);
            // .....setting again localStorage.........
            localStorage.setItem('storedData', JSON.stringify(localStorageData));
            
            props.success && (res.data.userType === 'E' ? (window.location.href = '/users/users-list') : (window.location.href = '/profile'));
        })
        .catch(error => {
            console.log("Something went wrong with Profile Api", error);
        });
        
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
                            top: '25rem',
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
                    <button className="modal-close-button" onClick={handelOk}>&times;</button>
                </div>

                {/* .......................Modal content....................................... */}
                <div className="inside-apply-modal inside-alert-modal inside-login-alert-model ml-2">

                    {
                    props.success ? <p>Thankyou for Signing In, Now you can Enjoy our Services.</p>
                    :
                    <p>Sorry! Somthing is wrong, Please try again with correct Credentials.</p>
                    }
                    <span className="d-flex eye-filter-button-bottom mt-2 mb-4">
                        <button className="eye-filter-decline-button button-login-alert-model mr-5" name="yes" onClick={handelOk}>OK</button>
                    </span>

                </div>

            </Modal>
        </>
    )
}

export default LoginAlertModel
