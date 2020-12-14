




import React, { useState } from 'react';
import './LoginModel.css';
import Modal from "react-modal";
import axios from '../axios';
import ApiCalls from '../ApiCalls';
import { Link, Redirect, Route, Router, useHistory } from 'react-router-dom';

function LoginModel(props) {


    const [username, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [showLoginModel, setshowLoginModel] = useState(true);

    let history = useHistory();


    function checkExpiration() {
        //check if past expiration date
        var values = JSON.parse(localStorage.getItem('storedData'));
        //check "my hour" index here
        if (values[1] < new Date()) {
            localStorage.removeItem("storedData");
            props.showLogin();
        }
    }

    function myFunction() {
        var myinterval = 15 * 60 * 1000; // 15 min interval
        setInterval(function () { checkExpiration(); }, myinterval);
    }

    myFunction();


    // if (){
    //     history.push("/home");
    // }



    const submitHandel = async e => {
        e.preventDefault();

        //............Calling Login Api for Token........................................
        const sendLoginData = { username, password };
        // console.log("Username, Password", username, password);
        console.log("sendLoginData is: ", sendLoginData);

        //...........Getting Token from login Api........................................
        try {
            const loginResponse = await axios.post("http://ec2-52-66-248-229.ap-south-1.compute.amazonaws.com:8083/auth/login", sendLoginData);
            const jwt_key = loginResponse.data.token;
            // console.log('jwt_key :', jwt_key);

            var myHour = new Date();
            myHour.setHours(myHour.getHours() + 1); //one hour from now
            var data = [jwt_key];
            data.push(myHour);
            localStorage.setItem('storedData', JSON.stringify(data));
            console.log('jwt_key', jwt_key);
            console.log('storedData :', JSON.parse(localStorage.getItem('storedData')));
            axios.defaults.headers.common = { 'Authorization': `Bearer ${jwt_key}` };
            // storing the Key in localStorage
            // localStorage.setItem('jwt_key', jwt_key);
            alert("You are now Signed In, Enjoy.....!");
            setshowLoginModel(false);
            props.hideLogin();

        } catch (e) {
            console.log('error occured while SignIn with SignIn_data', sendLoginData);
            alert(`Wrong username or pasword, Please Try again.!`);
            setshowLoginModel(true);
        }

    }




    return (
        <>
            <Modal
                id="LoginModel"
                isOpen={showLoginModel}
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
                        <button className="btn btn-outline-none btn-sm">&times;</button>
                    </div>

                    <div className="d-flex justify-content-center">
                        <form className="login-form" id="loginId" onSubmit={submitHandel} >

                            <label className="login-label">User Name</label>
                            <input className="form-control form-control-lg" type="text" value={username} onChange={(e) => setuserName(e.target.value)} placeholder="User Name" />

                            <label className="login-label">Password</label>
                            <input className="form-control form-control-lg" type="text" value={password} onChange={(e) => setpassword(e.target.value)} placeholder="Password" />

                            <button type="submit" className="btn btn-primary">Submit</button>

                        </form>
                    </div>
                </div>

            </Modal>
        </>
    )
}

export default LoginModel
