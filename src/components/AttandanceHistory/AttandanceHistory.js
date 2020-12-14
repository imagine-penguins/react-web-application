




import React, { useEffect, useState } from 'react';
import "./AttandanceHistory.css";
import axios from '../axios';
import ApiCalls from '../ApiCalls';

import SmallCardAttandanceHistory from "./SmallCardAttandanceHistory";
import TakeAttandance from "../TakeAttandance/TakeAttandance";
import AttandanceHistoryChartCard from "./AttandanceHistoryChartCard";
import FilterBar from "../FilterBar";

function AttandanceHistory() {

    // .............History GraphApi Call......................................................
    const [graphData, setgraphData] = useState([]);

    useEffect(() => {

        async function historyGraphData() {
            try {
                console.log("url:", ApiCalls.attendanceHistoryGraph);
                const res = await axios.get(ApiCalls.attendanceHistoryGraph)
                .then(responce => {
                    console.log("historyGraphData responce:", responce);
                    setgraphData(responce.data.content);
                })
                .catch(error => {
                    console.log("Something went wrong with historyGraphData Api", error);
                });
            }
            catch (error) {
                setgraphData([]);
                console.log("Error catched while calling historyGraphData Api", error);
            }
        }

        console.log("outside graphData: ", graphData);
        
        if (graphData.length === 0) {
            console.log("inside if graphData : ", graphData);
            return historyGraphData();
        };


    }, []);



    return (
        <>

            <div className="d-flex attandance-history-top justify-content-between ml-5 mr-5">
                <span className="d-flex attandance-history-top-drop1">
                    <p className="generate-report">Generate Report of</p>
                    <p className="generate-report-dropdown ml-3">Class 10A</p>
                    <span className="triangle-icon-at-bottom"></span>
                </span>

                <span className="d-flex attandance-history-top-drop2">
                    <p className="time-period">Time Period</p>
                    <p className="generate-report-dropdown ml-3">Custom</p>
                    <span className="triangle-icon-at-bottom"></span>
                </span>

                <span className="d-flex attandance-history-top-drop3">
                    <p className="select-perticular-user">Select Perticular User</p>
                    <p className="generate-report-dropdown ml-3">Gautam</p>
                    <span className="triangle-icon-at-bottom"></span>
                </span>

                <span className="d-flex attandance-history-top-butons">
                    <button className="dir-Add_user btn btn-outline-secondary p-0 export-report mr-4">Export Report</button>
                    <button className="dir-dots btn btn-outline-secondary p-0 ml-4">...</button>
                </span>
            </div>
            <hr style={{ width: "70%", marginLeft: "3rem", marginTop: "0rem", color: "rgba(94, 143, 199, 0.65)" }} />


            {/* ...............Pie Chart/ Small Card................................. */}
            <div className="d-flex mt-4 pt-1 ml-5 mr-5">
                <AttandanceHistoryChartCard data = {graphData} />
                <SmallCardAttandanceHistory heading={"Present"} color={"red"} amount={graphData.present} />
                <SmallCardAttandanceHistory heading={"Absent"} color={"blue"} amount={graphData.absent} />
                <SmallCardAttandanceHistory heading={"Leave"} color={"voilet"} amount={graphData.leave} />
            </div>


            {/* .................Filter bar.................................... */}
            <div className="mt-5 mb-2">
                <FilterBar hideGridView={true} />
            </div>

            {/* .................Take Attandance.................................... */}
            <div className="d-flex">
                <div className="in-AH-take-attandnce">
                    <TakeAttandance />
                </div>
                <div className="in-AH-button">
                    <button className="dir-Add_user btn btn-outline-secondary p-0 ml-3 mt-4 mr-5 edit-attandance">Edit Attandance</button>
                </div>
            </div>

        </>
    )
}

export default AttandanceHistory
