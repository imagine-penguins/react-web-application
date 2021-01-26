




import React, { useEffect, useState } from 'react';
import ApiCalls from '../ApiCalls';
import axios from '../axios';
import "./UserProfile.css";
import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from './UserProfileRight';

function UserProfile() {

        // ...................................UserProfile Api Call.......................................................
        const [userProfile, changeuserProfile] = useState([]);
    
        useEffect(() => {
    
            async function getData() {
                try {
                    await axios.get(ApiCalls.usersProfile).then(responce => {
                        console.log("User Profile responce", responce);
                        changeuserProfile(responce.data);
                        console.log("setting userProfile:", responce.data);
                    })
                        .catch(error => {
                            console.log("Something went wrong with Profile Api", error);
                        });
                }
                catch (error) {
                    changeuserProfile([]);
                    console.log("Error catched while calling Profile Api", error);
                }
            }
            
            console.log("userProfile is :", userProfile);
            getData();
            
    
        }, []);




    return (
        <>

            {/* ........................................To show Path............................................... */}
            <div className="d-flex text-secondary ml-4" style={{ fontSize: "1.3rem" }}>
                Users {`>`} Profile View
            </div>

            
            <div className="d-flex mt-2 pt-1">

                {/* .........................Left Part of User Profile............................................... */}
                <UserProfileLeft data={userProfile} />

                {/* ....................Right side of User Profile.................................... */}
                <UserProfileRight data={userProfile} />

            </div>

            {/* ....................empty div at last.................................... */}
            {/* <div className="d-flex last" style={{ height: "8rem" }} /> */}

        </>
    )
}

export default UserProfile
