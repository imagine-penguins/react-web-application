




import React, { useEffect, useState } from 'react';
import ApiCalls from '../ApiCalls';
import axios from '../axios';
import ToShowTopPath from '../ToShowTopPath';
import "./UserProfile.css";
import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from './UserProfileRight';

function UserProfile() {

    // ...................................UserProfile Api Call.......................................................
    const [userProfile, setuserProfile] = useState([]);
    const [changesInPath, setchangesInPath] = useState("Genral Information");

    useEffect(() => {
        let userData = JSON.parse(localStorage.getItem('storedData'))[2];
        console.log("userProfile is :", userData);

        if (userData){
            setuserProfile(userData);
        }

    }, []);




    return (
        <>

            {/* ........................................To show Path............................................... */}
            <ToShowTopPath path={`User / Profile / ${changesInPath}`} />


            <div className="d-flex mt-2 pt-1">

                {/* .........................Left Part of User Profile............................................... */}
                <UserProfileLeft data={userProfile} />

                {/* ....................Right side of User Profile.................................... */}
                <UserProfileRight data={userProfile} changes={(value) => setchangesInPath(value)} />

            </div>

        </>
    )
}

export default UserProfile
