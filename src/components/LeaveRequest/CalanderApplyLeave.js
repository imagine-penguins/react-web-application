




import React, {useState} from 'react';
import "./CalanderApplyLeave.css";
// import SingleCalendar from "react-single-calendar";
import { DateRange } from 'react-date-range';

var intialDate = new Date().toISOString().split("T")[0];

function CalanderApplyLeave(props) {
    
    // const [date, filterDate] = useState("");
    // const [endDate, setendDate] = useState(new Date());
    const [dateRange, setdateRange] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
          key: 'selection'
        }
      ]);

    props.obtainDates(dateRange);

    return (
        <div className="calander-div">
            <div className="d-flex">
                {/* <span className="d-flex calander-text">Calander</span> */}
                {/* <SingleCalendar className="d-flex calander-apply-leave" selectedDate={filterDate} range={true} /> */}
                <DateRange
                    editableDateInputs={true}
                    onChange={item => setdateRange([item.selection])}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                />
            </div>
        </div>
    )
}

export default CalanderApplyLeave
