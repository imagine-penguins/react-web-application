





import React from 'react';
import "./ToShowTopPath.css"

function ToShowTopPath(props) {
    return (
        <>
            {/* ........................................To show Path............................................... */}
            <div className="d-flex to-show-path mb-3 ml-5">
                {`${props.path}`}
            </div>
        </>
    )
}

export default ToShowTopPath
