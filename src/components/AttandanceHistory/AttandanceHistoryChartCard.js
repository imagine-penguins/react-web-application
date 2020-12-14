





import React from 'react';
import "./AttandanceHistoryChartCard.css";
import AHPieChart from "./AHPieChart";

function AttandanceHistoryChartCard(props) {


    return (

        <>  
            <div className="pie-chart-card-AH">
                <div className="d-flex">
                    <p className="small-card-attandance-history-heading pt-1 pb-1">Attandance History</p>
                    <i className="fas fa-info-circle text-secondary ml-auto mr-1" style={{ paddingTop: ".8rem" ,fontSize: "1.2rem" }}></i>
                </div>
                <hr className="underline-small-card" />
                <div className="pie-chart pt-2 pb-3">
                    <AHPieChart data= {props.data} />
                </div>
            </div>
        </>
    )
}

export default AttandanceHistoryChartCard
