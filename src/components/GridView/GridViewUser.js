





import React, { useState, useEffect } from 'react';
import "./GridViewUser.css";
import enums from "../enums";
import CardGrid from './CardGrid';


function GridViewUser(props) {

    // const [index, setindex] = useState(0);

    // useEffect(() => {
    //     let content;
    //     if ((index % 5) === 0) {
    //         content = "row";

    //     } else {
    //         content = "col";
    //     }
    // });



    return (
        <> 
        <div class="grid-container">

            { props.data.map((userdata, index) => (
                <div key={index} className="grid-item">
                    <CardGrid data={userdata} />
                 </div>     
        ))}
        
        </div>
        </>
    );
}

export default GridViewUser
