





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
};

class TakeAttandance extends React.Component {

    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    static getDerivedStateFromProps(props, state) {
            let newListData = state.toSaveList;
            console.log("inside getDerivedStateFromProps newListData is", newListData, props.paginationData);
            if (!(state.toSaveList[props.pageNo]) && (props.paginationData.length > 0)) {
                newListData = [];
                let data = props.paginationData.map((el) => ({ ...newListData, id: el.userId, status: true }));
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
    }

    changeHandler = (e) => {
        const id = e.target.name;
        const status = e.target.checked;
        console.log("id, status : ", id, status);

        let toUpdateSaveList = this.state.toSaveList;

        for (let i = 0; i < toUpdateSaveList[this.state.newPageNo].length; i++) {
            if (toUpdateSaveList[this.state.newPageNo][i]["id"] == id) {
                toUpdateSaveList[this.state.newPageNo][i]["status"] = status;
            }
        };

        console.log("after update toUpdateSaveList : ", toUpdateSaveList);
        this.setState({toSaveList: toUpdateSaveList});

    }

    returnChecked = (id, pageNo) => {
        console.log("id is :", id, pageNo, this.state.toSaveList);
        const filteredData = this.state.toSaveList[pageNo].filter(el => (el.id == id));
        console.log("filteredData is :", filteredData[0].status);
        return filteredData[0].status;
    }


    render() {

        const slider = this.props.paginationData.map((data, index) => (
            <div key={index} className="d-flex user-attandance-card ml-5 pb-3 mt-4 bg-white">

                {/* ..........................Name.............................. */}
                <div className="col-4">
                    <form className="Form ml-4 user-attandance-form mt-2 pt-3 mr-auto">
                        <input type="checkbox" className="list-check-box mr-1" id="user-name" name="user-name" />
                        <img className='list-img-icon ml-1 mr-4' src="/images/pic_gautam.png" alt="Avatar" style={{ width: "3.8rem", height: "3.8rem" }} />
                        <label className='user-attandance-card-name'>{`${data.firstName} ${data.lastName}`}</label>
                    </form>
                </div>

                {/* ..........................Roll No........................................ */}
                <div className="col-4">
                    <div className="pl-3 mt-1 pt-4 text-secondary"><i className="user-attandance-card-rollno ml-3">{data.rollNumber}</i></div>
                </div>

                {/* ..........................Mark Attandance Status.............................. */}
                <div className="col-4 pt-1">
                    {console.log('defaultChecked inside return : ', this.state.toSaveList, this.state.dataList, this.state.newPageNo, index, this.state.toSaveList[this.state.newPageNo][index]["status"])}
                    <label key={index + 10} className="switch mt-4 pl-4 ml-5">
                        <input type="checkbox" key={index + 2} name={data.userId} checked={this.returnChecked(data.userId, this.state.newPageNo)} onChange={this.changeHandler} />
                        <span className="slider round attandance-slider" />
                    </label>
                </div>

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

                {/* ....................Save Button........................................... */}
                {
                    this.state.newPageNo === this.state.totalPages - 1 &&
                    <>
                    <button className="attandance-list-button-save" onClick={() => this.setState({showModel: true})}>Save</button>
                    <ConfirmTakeAttandanceModel toSaveData={this.state.toSaveList} show={this.state.showModel} hide={() => this.setState({showModel: false})} />
                    </>
                }
                

            </>
        );
    }
}

export default TakeAttandance
