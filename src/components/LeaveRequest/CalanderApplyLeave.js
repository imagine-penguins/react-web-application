




import React, { useEffect, useState } from 'react';
import "./CalanderApplyLeave.css";
import { DateRange } from 'react-date-range';


function CalanderApplyLeave(props) {

    const [dateRange, setdateRange] = useState([
        {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        props.obtainDates(dateRange);
    }, [dateRange])

    return (
        <div className="calander-div">
            <div className="d-flex">
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
