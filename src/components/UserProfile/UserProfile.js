




import React from 'react';
import "./UserProfile.css";
import UserProfileLeft from "./UserProfileLeft";
import UserProfileRight from './UserProfileRight';

function UserProfile() {




    return (
        <>

            {/* ........................................To show Path............................................... */}
            <div className="d-flex text-secondary ml-4" style={{ fontSize: "1.3rem" }}>
                Users {`>`} Profile View
            </div>

            
            <div className="d-flex mt-2 pt-1">

                {/* .........................Left Part of User Profile............................................... */}
                <UserProfileLeft />

                {/* ....................Right side of User Profile.................................... */}
                <UserProfileRight />

            </div>

            {/* ....................empty div at last.................................... */}
            {/* <div className="d-flex last" style={{ height: "8rem" }} /> */}

        </>
    )
}

export default UserProfile
