





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

function LeaveRequestChart(props) {


    const data = props.chartData;


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
                        <button className="ml-3">All Time</button>
                        <button className="ml-3">This Sem</button>
                        <button className="ml-3">This Month</button>
                        <button className="ml-3">This week</button>
                    </div>

                    <div className="leave-attandance-chart p-4">
                        <ResponsiveContainer className="bar-container-chart">
                            <BarChart
                                data={data}
                                barSize={9}
                            >
                                <defs>
                                    <linearGradient id="showGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="rgb(127 197 251)" />
                                        <stop offset="100%" stopColor="rgb(82 146 244)" />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid vertical={false} stroke="#d6d9da" />
                                <XAxis height={38} dataKey="month" stroke="grey" tick={{ fontSize: "80%", fontWeight: 700 }} angle={-35} dy={15} axisLine={false} tickLine={false} />
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
