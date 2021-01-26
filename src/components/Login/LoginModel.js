




import React, { useState } from 'react';
import './LoginModel.css';
import Modal from "react-modal";
import axios from '../axios';
import ApiCalls from '../ApiCalls';
import { Link, Redirect, Route, Router, useHistory } from 'react-router-dom';
import LoginAlertModel from '../LoginAlertModel';

function LoginModel(props) {


    const [showAlert, setshowAlert] = useState(false);
    const [username, setuserName] = useState("");
    const [password, setpassword] = useState("");

    let history = useHistory();


    // function checkExpiration() {
    //     //check if past expiration date
    //     var values = JSON.parse(localStorage.getItem('storedData'));
    //     //check "my hour" index here
    //     if (values[2] < new Date()) {
    //         localStorage.removeItem("storedData");
    //         props.showLogin();
    //         window.location.href = '/';
    //     }
    // }

    // function myFunction() {
    //     var myinterval = 15 * 60 * 1000; // 15 min interval
    //     setInterval(function () { checkExpiration(); }, myinterval);
    // }

    // myFunction();



    const submitHandel = async e => {
        e.preventDefault();

        //............Calling Login Api for Token........................................
        const sendLoginData = { username, password };
        // console.log("Username, Password", username, password);
        console.log("sendLoginData is: ", sendLoginData);

        //...........Getting Token from login Api........................................
        try {
            const loginResponse = await axios.post("http://ec2-13-126-215-181.ap-south-1.compute.amazonaws.com:8083/auth/login", sendLoginData);
            const jwt_key = loginResponse.data.token;
            const refreshToken = loginResponse.data.refreshToken;
            console.log('loginResponse :', loginResponse);

            // var myHour = new Date();
            // myHour = myHour.getTime() + 1000; //one hour from now
            let data = [jwt_key];
            data.push(refreshToken);
            // console.log('data :', data);
            localStorage.setItem('storedData', JSON.stringify(data));       // Setting Local Storage
            // console.log('refreshToken :', refreshToken);
            console.log('storedData :', JSON.parse(localStorage.getItem('storedData')));
            axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt_key}` };

            props.hideLogin();

        } catch (e) {
            console.log('error occured while SignIn with SignIn_data', e);
        }

    }




    return (
        <>
            <Modal
                id="LoginModel"
                isOpen={props.show}
                shouldCloseOnOverlayClick={false}
                style={
                    {
                        content: {
                            left: '35%',
                            top: "20%",
                            padding: "2rem",
                            backgroundColor: "rgb(211,211,211,0.2)",
                            borderRadius: "1.5rem",
                            zIndex: "10",
                        }
                    }
                }
            >
                <div className="yo-login">
                    <div className="d-flex login-close justify-content-end">
                        <p className="login-title">Sign In</p>
                        <button className="btn btn-outline-none btn-sm" onClick={props.hideLogin}>&times;</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <form className="login-form" id="loginId" onSubmit={submitHandel} >

                            <label className="login-label">User Name</label>
                            <input className="form-control form-control-lg" type="text" value={username} onChange={(e) => setuserName(e.target.value)} placeholder="User Name" />

                            <label className="login-label">Password</label>
                            <input className="form-control form-control-lg" type="text" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />

                            <button type="submit" className="btn btn-primary" onClick={() => setshowAlert(!showAlert)}>Submit</button>
                            {/* ..............Showing Alert Model........................ */}
                            <LoginAlertModel show={showAlert} hide={() => setshowAlert(false)} success={false} />


                        </form>
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default LoginModel
