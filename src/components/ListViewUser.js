




import React, { useState, useEffect } from 'react';
import "./ListViewUser.css";
import enums from "./enums";
import axios from "./axios";


function ListViewUser(props) {

    const [statusCheck, setstatusCheck] = useState("");

    // ...................................UserApi Call.......................................................
    const [userDataAxios, changeUserDataAxios] = useState([]);
    const [count, changecount] = useState(0);

    // useEffect(() => {

    //     async function getData() {
    //         try{
    //             const res = await axios.get("users").then(responce => {
    //                 console.log("User data responce", responce);
    //                 changeUserDataAxios(responce.data.userDTOS);
    //                 changecount(count + 1);
    //                 console.log("user-data", userDataAxios);
    //             })
    //             .catch(error => {
    //                 console.log("Something went wrong with list Api", error);
    //             });
    //         }
    //         catch (error){
    //             changeUserDataAxios([]);
    //             console.log("Error catched while calling User Api", error);
    //         }
    //     }

    //     console.log("count: ", count);
    //     if(count === 0){
    //         getData();
    //     };
        
    // }, []);


    return (
        <> { userDataAxios.map((userdata, index) => (
            <div key={index} className="d-flex user-card ml-4 mr-5 mt-2 bg-white">

                    {/* ..........................Name.............................. */}
                    <div className="col-3">
                        <form className="Form pt-4 mr-auto">
                            <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                            <img className='list-img-icon ml-1 mr-2' src="/images/pic_gautam.png" alt="Avatar" />
                            <label>{`${userdata.firstName} ${userdata.lastName}`}</label>
                        </form>
                    </div>

                    {/* ..........................Contact.............................. */}
                    <div className="col-3">
                        <div className="row pl-3 mt-1 pt-1 text-secondary"><i class="fa fa-envelope-o pt-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact.email}</i></div>
                        <div className="row pl-3 pb-2 text-secondary"><i class="fa fa-phone py-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact.phone}</i></div>
                    </div>

                    {/* ..........................User Type.............................. */}
                    <div className="col-2 text-secondary justify-content-center">
                        <p className="mt-3 list-user-type pt-1 ml-4">{enums[`${userdata.userType}`]}</p>
                    </div>

                    {/* ..........................User Status.............................. */}
                    {userdata.active ? <div className="col-4">
                        <label className="switch mt-4 pl-4 ml-5">
                            <input type="checkbox" defaultChecked />
                            <span className="slider round"></span>
                        </label>
                    </div> : <div className="col-4">
                            <label className="switch mt-4 pl-4 ml-5">
                                <input type="checkbox" />
                                <span className="slider round"></span>
                            </label>
                        </div>
                    }

            </div>

        ))}

        { userDataAxios.length > 0 ? <div></div> : <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>Sorry There is no data to Show</div> }

        </>
    );
}

export default ListViewUser
