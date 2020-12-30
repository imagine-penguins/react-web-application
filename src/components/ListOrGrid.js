





import React, { useState, useEffect } from 'react';
import axios from "./axios";
import ApiCalls from "./ApiCalls";
import ListViewUser from './ListViewUser';
import GridViewUser from './GridView/GridViewUser';



function ListOrGrid(props) {

    // ...................................UserApi Call.......................................................
    // const [userDataAxios, changeUserDataAxios] = useState([]);
    // const [count, changecount] = useState(0);

    // useEffect(() => {

    //     async function getData() {
    //         try {
    //             const res = await axios.get(ApiCalls.listUsers).then(responce => {
    //                 console.log("User data responce", responce);
    //                 changeUserDataAxios(responce.data._embedded.userDTOList);
    //                 changecount(count + 1);
    //                 console.log("user-data in list view:", userDataAxios);
    //             })
    //                 .catch(error => {
    //                     console.log("Something went wrong with list Api", error.responce.data);
    //                 });
    //         }
    //         catch (error) {
    //             changeUserDataAxios([]);
    //             console.log("Error catched while calling User Api", error);
    //         }
    //     }
    //     getData();

    // }, []);



    return (
        <>
            {/* { props.listOrGrid ? <GridViewUser dataList={userDataAxios} /> : <ListViewUser dataList={userDataAxios} /> } */}
        </>
    )
}

export default ListOrGrid