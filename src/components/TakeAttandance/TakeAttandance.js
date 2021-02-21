





import React from 'react';
import "../ListViewUser.css";
import "./TakeAttandance.css";
import ConfirmTakeAttandanceModel from './ConfirmTakeAttandanceModel';

const defaultState = {
    totalPages: 0,
    newPageNo: 0,
    toSaveList: [],
    dataList: [],
    showModel: false,
    editHistory: true,
    id: "",
    status: false,
    attandanceId: "",
    index: 0
};

class TakeAttandance extends React.Component {

    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    static getDerivedStateFromProps(props, state) {
        let newListData = state.toSaveList;
        console.log("inside getDerivedStateFromProps takeAttandance newListData is", props.pageNo, newListData, props.paginationData);

        if (!(state.toSaveList[props.pageNo]) && (props.paginationData.length > 0)) {
            newListData = [];
            let data = props.paginationData.map((el) => ({ ...newListData, id: el.userId, status: el.status === "L" ? "L" : (el.status === "P" ? true : false) }));
            newListData = state.toSaveList.concat([data]);
            console.log("newListData to save in toSaveList : ", newListData);
        }
            
        return {
            newPageNo: props.pageNo,
            toSaveList: newListData,
            dataList: props.paginationData,
            totalPages: props.totalPages,
            showModel: state.showModel,
        };
    }

    componentDidMount() {
        this.props.onRef(this);
        // console.log("inside componentDidMount toUpdateSaveList : ", this.state.toSaveList);
    }

    changeHandler = (e) => {
        const id = e.target.name;
        const status = e.target.checked;
        const index = e.target.getAttribute("data-key");
        const attandanceId = e.target.getAttribute("data-id");
        console.log("id, index, status, attandanceId : ", id, index, status, attandanceId);

        if (this.props.attandanceHistory){
            this.setState({showModel: true, id: id, status: status, index: index, attandanceId: attandanceId});
        }

        else{
            let toUpdateSaveList = this.state.toSaveList;
            console.log("after update toUpdateSaveList : ", toUpdateSaveList);

            for (let i = 0; i < toUpdateSaveList[this.state.newPageNo].length; i++) {
                if (toUpdateSaveList[this.state.newPageNo][i]["id"] == id) {
                    toUpdateSaveList[this.state.newPageNo][i]["status"] = status;
                }
            };

            this.setState({toSaveList: toUpdateSaveList, id: id, status: status, index: index});
        }

    }

    //.............Edit Attandance..........................
    editAttandance = (id, status, index) => {
        let toUpdateSaveList = this.state.toSaveList;

        for (let i = 0; i < toUpdateSaveList[0].length; i++) {
            if (i == index) {
                toUpdateSaveList[0][i]["status"] = status;
            }
        };

        console.log("after update in editAttandance index, status, toUpdateSaveList : ", index, status, toUpdateSaveList);

        this.setState({toSaveList: toUpdateSaveList});
    }

    //.............It returns Checked or Not..........................
    returnChecked = (id, pageNo, index) => {
        const filteredChecked = this.state.toSaveList[pageNo][index].status;
        // console.log("filteredChecked is :", filteredChecked);
        return filteredChecked;
    }


    render() {

        const {attandanceHistory} = this.props;

        const slider = this.props.paginationData.map((data, index) => (
            <div key={index} className="d-flex user-attandance-card ml-5 pb-3 mt-4 bg-white">

                {/* ..........................Name.............................. */}
                <div className="col-4">
                    <form className="Form ml-4 user-attandance-form mt-2 pt-3 mr-auto">
                        <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                        <img className='list-img-icon ml-1 mr-4' src={data.profilePic ? `${data.profilePic}` : `/images/No_Image.png`} alt="Avatar" style={{ width: "3.8rem", height: "3.8rem" }} />
                        <label className='user-attandance-card-name'>{`${data.firstName} ${data.lastName}`}</label>
                    </form>
                </div>

                {/* ..........................Roll No........................................ */}
                <div className="col-4">
                    <div className="pl-3 mt-1 pt-4 text-secondary"><i className="user-attandance-card-rollno ml-3">{data.rollNumber}</i></div>
                </div>
                
                {/* ..........................Mark Attandance Status.............................. */}
                {data.status === "L"
                ? 
                (<div className="col-4 pt-1 take-attandance-leave"><p>Leave</p></div>)
                :
                (<div className="col-4 pt-1">
                    <label key={index + 10} className="switch mt-4 pl-4 ml-5">
                        <input type="checkbox" key={index} name={data.userId} data-id={data.attendanceId} data-key={index} checked={this.returnChecked(data.userId, this.state.newPageNo, index)} onChange={this.changeHandler} />
                        <span className="slider round attandance-slider" />
                    </label>
                </div>)
                }

            </div>

        ));

        return (
            <>
                {/* ....................Item heading Details........................................... */}
                <div className="d-flex heading-list ml-5 mt-4 bg-white">
                    <div className="col-4">
                        <form className="Form pt-2 ml-5">
                            <input type="checkbox" className="list-check-box pt-1 mr-2" />
                            <label className="heading-list-Users">Name</label>
                        </form>
                    </div>
                    <div className="col-4 pt-2">
                        <span className="heading-list-rollno">Roll No / Employee ID</span>
                    </div>
                    <div className="col-4 pt-2 ml-5">
                        <span className="heading-list-mark-attandance pl-5">Mark Attandance</span>
                    </div>
                </div>

                {/* ....................Attandance List........................................... */}
                { slider }

                {attandanceHistory && <ConfirmTakeAttandanceModel attandanceHistory={attandanceHistory} id={this.state.id} index={this.state.index} status={this.state.status} attandanceId={this.state.attandanceId} edited={(id, status, index) => {this.editAttandance(id, status, index)}} show={this.state.showModel} hide={() => this.setState({showModel: false})} />}

                {/* ....................Save Button........................................... */}
                {(this.props.paginationData.length <= 0) ?

                    <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>No Data to show.</div>

                :
                    (this.state.newPageNo === this.state.totalPages - 1 && !(attandanceHistory) &&
                    <>
                        <button className="attandance-list-button-save" onClick={() => this.setState({showModel: true})}>Save</button>
                        <ConfirmTakeAttandanceModel attandanceHistory={attandanceHistory} toSaveData={this.state.toSaveList} show={this.state.showModel} hide={() => this.setState({showModel: false})} />
                    </>)
                }
                
                {/* { (attandanceHistory && (this.props.paginationData.length <= 0)) ? <div className="mt-5 pt-5 text-danger text-center" style={{ fontSize: "1.6rem", fontWeight: "500" }}>No Data to show.</div> : <></> } */}
            </>
        );
    }
}

export default TakeAttandance
