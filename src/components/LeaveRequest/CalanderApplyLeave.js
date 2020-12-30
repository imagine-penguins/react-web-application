




import React, {useState} from 'react';
import "./CalanderApplyLeave.css";
import SingleCalendar from "react-single-calendar";

var intialDate = new Date().toISOString().split("T")[0];

function CalanderApplyLeave(props) {
    
    const [date, filterDate] = useState("");
    // const [endDate, setendDate] = useState(new Date());

    props.obtainDates(date);

    return (
        <div className="calander-div">
            <div className="d-flex">
                <span className="d-flex calander-text">Calander</span>
                <SingleCalendar className="d-flex calander-apply-leave" selectedDate={filterDate} range={true} />
            </div>
        </div>
    )
}

export default CalanderApplyLeave
