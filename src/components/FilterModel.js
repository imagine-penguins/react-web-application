




import React from 'react';
import Modal from "react-modal";
import "./FilterModel.css";

Modal.setAppElement("#root")

function FilterModel(props) {


    return (
        <Modal
            id="filterModel"
            isOpen={props.show}
            onRequestClose={props.hide}
            style={
                {
                    content: {
                        left: 'auto',
                        right: "4rem",
                        top: "15rem",
                    }
                }
            }
        >   
            <div className="">
                <div className="d-flex justify-content-end">
                    <button className="btn btn-outline-none" onClick={props.hide}>&times;</button>
                </div>
                <div className="inside-filter" id="apply-filter">
                    <input className="form-control form-control-lg" type="text" placeholder="User Type" />
                    <input className="form-control form-control-lg" type="text" placeholder="User Role" />
                    <input className="form-control form-control-lg" type="text" placeholder="Status" />
                    <button type="submit" className="btn btn-dark mt-3" onClick={props.hide} >Apply</button>
                </div>
            </div>
        </Modal>
    )
}

export default FilterModel
