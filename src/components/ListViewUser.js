




import React, { useState, useEffect } from 'react';
import "./ListViewUser.css";
import enums from "./enums";
import AlertModel from './AlertModel';


function ListViewUser(props) {

    const [show, setshow] = useState(false);
    const [dataList, setdataList] = useState([]);
    const [checkedOrNot, setcheckedOrNot] = useState(false);
    const [userId, setuserId] = useState("");
    const [stateIndex, setstateIndex] = useState("");

    
    useEffect(() => {
        console.log("props.paginationData inside ListViewUsers UseEffect :", props.paginationData);
        setdataList(props.paginationData);
    }, [props.paginationData])

    const handelChange = (e) => {
        let checked = e.target.checked;
        const id = e.target.getAttribute("data-id");
        const index = e.target.getAttribute("data-index");
        console.log("index, id, checked are :", index, id, checked);

        setcheckedOrNot(checked);
        setuserId(id);
        setstateIndex(index);
    }

    const afterHandel = (e) => {
        let xData =  dataList;
        console.log("xData :", dataList, xData[stateIndex], xData[stateIndex].active);
        
        //....If user Press No.....
        if(!e){
            console.log("INSIDE DINTUPDATE :");
            xData[stateIndex].active = checkedOrNot;
            setdataList(xData);
        }
    }



    return (
        <> { dataList.map((userdata, index) => (
            <div key={index} className="d-flex user-card ml-5 mr-5 mt-4 bg-white">

                    {/* ..........................Name.............................. */}
                    <div className="col-3">
                        <form className="form-user-list mr-auto">
                            <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                            <img className='list-img-icon ml-1 mr-2' src={userdata.profilePic ? `${userdata.profilePic}` : `/images/No_Image.png`} alt="Avatar" />
                            <label className='list-names pl-1'>{`${userdata.firstName} ${userdata.lastName}`}</label>
                        </form>
                    </div>

                    {/* ..........................Contact.............................. */}
                    <div className="col-3">
                        <div className="row pl-3 mt-1 pt-1"><i className="fa fa-envelope-o pt-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact ? userdata.contact.email : `---`}</i></div>
                        <div className="row pl-3 pb-2"><i className="fa fa-phone py-2" aria-hidden="true"></i><i className="ml-3">{userdata.contact ? userdata.contact.phone : `---`}</i></div>
                    </div>

                    {/* ..........................User Type.............................. */}
                    <div className="col-2 justify-content-center">
                        <p className="mt-3 list-user-type pt-1 ml-4">{enums[`${userdata.userType}`]}</p>
                    </div>

                    {/* ..........................User Status.............................. */}
                    <label className="switch mt-4 pl-4 ml-5">
                        <input type="checkbox" data-id={userdata.id} data-index={index} checked={userdata.active} onChange={handelChange} onClick={() => setshow(true)} />
                        <span className="slider round"></span>
                    </label>
                    <AlertModel show={show} hide={() => setshow(false)} dontUpdate={(e) => afterHandel(e)} checkedOrNot={checkedOrNot} userId={userId} />

            </div>

        ))}

        { props.paginationData.length > 0 ? <div></div> : <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>Sorry There is no data to Show</div> }

        </>
    );
}

export default ListViewUser
