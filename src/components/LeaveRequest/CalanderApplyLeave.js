




import React, {useState} from 'react';
import "./CalanderApplyLeave.css";
import SingleCalendar from "react-single-calendar";

function CalanderApplyLeave(props) {

    const [Dates, setDates] = useState(new Date());
    // const [endDate, setendDate] = useState(new Date());

    // const selectionRange = {
    //     startDate : startDate,
    //     endDate : endDate,
    //     key : "selection"
    // }

    // const handelSelect = (ranges) => {
    //     setstartDate(ranges.selection.startDate);
    //     setendDate(ranges.selection.endDate);
    // }
    props.obtainDates(Dates);

    return (
        <div className="calander-div">
            <div className="d-flex">
                <span className="d-flex calander-text">Calander</span>
                <SingleCalendar className="d-flex calander-apply-leave" selectedDate={setDates} range={true} minDate={Dates} />
            </div>
        </div>
    )
}

export default CalanderApplyLeave
