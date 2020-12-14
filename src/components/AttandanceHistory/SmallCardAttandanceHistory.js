





import React from 'react';
import "./SmallCardAttandanceHistory.css";

function SmallCardAttandanceHistory(props) {
    return (
        <>
            <div className="small-card-attandance-history ml-5">
                <p className="small-card-attandance-history-heading">{props.heading}</p>
                <hr className="underline-small-card" />
                <p className="small-card-attandance-history-text">No. of days</p>
                <span className="d-flex">
                    <span className={`round-circle-small-card-history ${props.color} mt-1`} />
                    <span className="small-card-attandance-history-days pl-4">{props.amount}</span>
                </span>
                <span className="d-flex mt-2 mb-2">
                    <i className="fa fa-history card-small-history-icon text-primary" aria-hidden="true" />
                    <span className="history-small-card-attandance-history text-primary pl-2">history</span>
                </span>

            </div>
        </>
    )
}

export default SmallCardAttandanceHistory
