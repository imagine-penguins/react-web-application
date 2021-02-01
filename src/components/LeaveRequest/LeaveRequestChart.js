





import React, { useEffect, useState } from 'react';
import "./LeaveRequestChart.css"
import {
    ResponsiveContainer,
    Bar,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";
import axios from '../axios';
import ApiCalls from '../ApiCalls';
import moment from 'moment';



function LeaveRequestChart(props) {

    const [barGraphData, setbarGraphData] = useState([]);

    async function obtainApisData(startDate, endDate) {
        let apiCall = props.appliedLeaves ? ApiCalls.leaveRequestsGraph : ApiCalls.leaveRequestsHistoryGraph;

        // ..................Bar Graph Api.....................................
        try {
            await axios.get(apiCall + `?search=startDate>:${startDate},endDate<:${endDate}`)
            .then(responce => {
                console.log("barGraphData responce inside lavRequestsChart:", responce);
                setbarGraphData(responce.data._embedded.graphDataList.concat({month: "", leaveCount: 0}, {month: "", leaveCount: 0}));
            })
            .catch(error => {
                console.log("Something went wrong with LeaveRequestChart Api", error);
            });
        }
        catch (error) {
            setbarGraphData([]);
            console.log("Error catched while calling LeaveRequestChart Api", error);
        }

    }

    useEffect(() => {
        
        console.log("barGraphData: ", barGraphData);

        obtainApisData("", "");

    }, [props.appliedLeaves]);

    //............To Get Start/End date for Chart Filters..............................
    const getCurrectDate = (e) => {
        let name = e.target.name;

        let currentDate = moment();

        //...........If All Time......................
        if (name === "Time_"){
            console.log("When All Time is clicked :");
            obtainApisData("", "");
        }

        //...........If Sem......................
        // else if (name === "Sem_"){
        //     let weekStart = currentDate.clone().startOf('isoWeek');
        //     let weekEnd = currentDate.clone().endOf('isoWeek');
    
        //     console.log("weekStart, weekEnd", weekStart.format('DD-MM-YYYY'), weekEnd.format('DD-MM-YYYY'));
        // }

        //...........If Month......................
        else if (name === "Month_"){
            let startDate = currentDate.clone().startOf('month').format('DD_MM_YYYY');
            let endDate = currentDate.clone().endOf('month').format('DD_MM_YYYY');
    
            console.log("monthStart, monthEnd", startDate, endDate);
            obtainApisData(startDate, endDate);
        }

        //...........If Week......................
        else if (name === "Week_"){
            let startDate = currentDate.clone().startOf('isoWeek').format('DD_MM_YYYY');
            let endDate = currentDate.clone().endOf('isoWeek').format('DD_MM_YYYY');
    
            console.log("weekStart, weekEnd", startDate, endDate);
            obtainApisData(startDate, endDate);
        }

    }


    //..........Data given to chart should be in this form....................
    // const data =
    //     [
    //         {
    //             month: "Jan",
    //             barData: 40
    //         },
    //         {
    //             month: "Feb",
    //             barData: 30
    //         },
    //     ]



    return (
        <>
            <div className="div-to-wrap">
                

                <div className="leave-reaquest-right ml-4 mt-4 pt-1">
                    <div className="d-flex mt-3 ml-3">
                        <div className="heading-leave-request w-25 ml-2 mr-4">Leave Trend</div>
                        <i className="fas fa-info-circle text-secondary ml-5 mt-3" style={{ fontSize: "1.2rem" }}></i>
                        <i className="fas fa-info-circle text-secondary ml-auto mt-3 mr-4" style={{ fontSize: "1.2rem" }}></i>
                    </div>
                    <hr style={{ width: "32%", marginLeft: "2.0rem", marginTop: ".8rem", borderTop: ".1rem solid rgb(238 244 248, 1)" }} />
                    <div className="d-flex leave-request-right-buttons mt-1">
                        <button className="ml-3" name="Time_" onClick={getCurrectDate}>All Time</button>
                        <button className="ml-3" name="Sem_" onClick={getCurrectDate}>This Sem</button>
                        <button className="ml-3" name="Month_" onClick={getCurrectDate}>This Month</button>
                        <button className="ml-3" name="Week_" onClick={getCurrectDate}>This Week</button>
                    </div>

                    <div className="leave-attandance-chart p-4">
                        <ResponsiveContainer className="bar-container-chart">
                            <BarChart
                                data={barGraphData}
                                barSize={9}
                            >
                                <defs>
                                    <linearGradient id="showGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgb(127 197 251)" />
                                        <stop offset="100%" stopColor="rgb(82 146 244)" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#d6d9da" />
                                <XAxis height={38} dataKey="period" stroke="grey" tick={{ fontSize: "80%", fontWeight: 700 }} angle={-35} dy={15} axisLine={false} tickLine={false} />
                                <YAxis width={35} type="number" domain={[0, 100]} stroke="grey" interval={0} tick={{ fontSize: "100%", fontWeight: 800 }} axisLine={false} tickLine={false}  />
                                <Bar dataKey="leaveCount" radius={[30, 30, 0, 0]} fill="url(#showGradient)" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                </div>
            </div>
        </>
    )
}

export default LeaveRequestChart
