





import React from 'react';
import './CardGrid.css';
import enums from './enums';

function CardGrid(props) {

    return (
            <div className="card" style={{ border: "none" }}>
                <img className='grid-card-img' src="/images/pic_gautam.png" alt="Avatar" />
                <div className="grid-card-body">
                    <h6 className="grid-card-name text-primary">{props.data.firstName}</h6>
                    <p className="grid-card-text">{enums[`${props.data.userType}`]}</p>
                </div>
            </div>
    )
}

export default CardGrid
