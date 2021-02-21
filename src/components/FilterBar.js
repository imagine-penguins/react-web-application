




import React from 'react';

import "./FilterBar.css";
import axios from "./axios";
import enums from "./enums";
import ApiCalls from "./ApiCalls";
import FilterModel from './FilterModel';
import ItemDetails from './ItemDetails';
import TakeAttandance from './TakeAttandance/TakeAttandance';
import GridViewUser from './GridView/GridViewUser';
import ListViewUser from './ListViewUser';
import moment from "moment";
import CalanderApplyLeave from './LeaveRequest/CalanderApplyLeave';


const defaultState = {
    UserOrAttandanceApi: "",
    listName: "",
    size: "",
    swiched: "",
    showFilters: false,
    totalPages: 1,
    countPages: 0,
    pageSize: 0,
    totalElements: 0,
    takeAttandanceListData: [],
    searchTerm: '',
    filterObj: {
        userType: [],
        department: [],
        class: [],
        subject: [],
        role: [],
    },
    allFilters: {},
    filterTerm: false,
    toSendQuery: "&search=userType:S",
    mainFilterQuery: "",
    timeQuery: "",
    ascDec: "ascending",
    sortBy: "rollNumber",
    showDateRangePicker: false,
    dateToPost: ""
}

class FilterBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = defaultState;
    }

    
    componentDidMount() {
        console.log("UserOrAttandanceApi, listName, size inside componentDidMount : ", this.UserOrAttandanceApi, this.listName, this.size);
        this.takeAttandanceList(this.state.UserOrAttandanceApi, this.state.listName, this.state.size);
        this.callFilterApi();
    }
    
    static getDerivedStateFromProps(props, state) {
        const UserOrAttandanceApi = props.attandanceHistory ? ApiCalls.attendanceHistory : props.takeAttandance ? ApiCalls.attendanceUsers : ApiCalls.listUsers;
        const listName = props.attandanceHistory ? "userAttendanceResponseDTOList" : props.takeAttandance ? "userAttendanceResponseDTOList" : "userDTOList";
        const size = props.attandanceHistory ? 10 : props.takeAttandance ? 6 : 10;

        console.log("UserOrAttandanceApi, listName, size inside getDerivedStateFromProps in FilterBar : ", UserOrAttandanceApi, listName, size);
        return {
            UserOrAttandanceApi: UserOrAttandanceApi,
            listName: listName,
            size: size,
        }
    }

    

    componentDidUpdate(prevProps, prevState) {
        if (prevState.UserOrAttandanceApi !== this.state.UserOrAttandanceApi) {
          console.error('this.AttandanceChild, this.UserChild state has changed.', this.AttandanceChild, this.UserChild);
          this.AttandanceChild.state.toSaveList = [];
          this.setState(defaultState);
          this.componentDidMount();
        };
      }


    // ...........................Initial Attandance Api Data.....................................
    takeAttandanceList(UserOrAttandanceApi, listName, size) {
        try {
            console.log("FilterData at the very begning is: ", this.state.takeAttandanceListData);
            console.log("url in filterbar :", UserOrAttandanceApi);
            axios.get(UserOrAttandanceApi + `?size=${size}${this.state.toSendQuery}${this.state.mainFilterQuery}`)
                .then(responce => {
                    console.log("AttandanceUsers responce:", responce);
                    this.setState({
                        swiched: UserOrAttandanceApi,
                        totalPages: this.props.attandanceHistory ? 1 : responce.data.page.totalPages,
                        pageSize: this.props.attandanceHistory ? 10 : responce.data.page.size,
                        totalElements: this.props.attandanceHistory ? 10 : responce.data.page.totalElements,
                        takeAttandanceListData: responce.data._embedded ? responce.data._embedded[listName] : []
                    });
                })
                .catch(error => {
                    console.log("Something went wrong with FilterBar Api", error);
                });
        }
        catch (error) {
            console.log("Error catched while calling FilterBar Api", error);
        }
    }

    // ..............Getting filters.............................
    async callFilterApi() {
        let res = await axios.get("/filters")
            .catch(e => console.log("Caught error in /filters api:", e));

        console.log("responce from /filter api:", res);

        try{
            let filterObj = res.data;

            let userType = filterObj.userTypes.map((data) => {
                const obj = Object.assign({}, data);
                obj.name = data === "S" ? true : false;
                return obj;
            });

            let department = filterObj.departments.map((data) => {
                const obj = Object.assign({}, data);
                obj.name = false;
                return obj;
            });

            let clas = filterObj.classes.map((data) => {
                const obj = Object.assign({}, data);
                obj.name = false;
                return obj;
            });

            let subject = filterObj.subjects.map((data) => {
                const obj = Object.assign({}, data);
                obj.name = false;
                return obj;
            });

            let role = filterObj.roles.map((data) => {
                const obj = Object.assign({}, data);
                obj.name = false;
                return obj;
            });

            filterObj = {userType : userType, department : department, role: role, subject: subject, class: clas};

            console.log("inside /filter api filterObj is :", filterObj);

            this.setState({allFilters: res.data, filterObj: filterObj});
        }
        catch(e){
            console.log("Error caught in callFilterApi :", e);
        }
    }


    // ............Handling right Pagination.....................
    handelPagintionRight = () => {
        let xCount = this.state.countPages + 1;
        console.log("in handelPagintionRight countPages, totalPAges are :", xCount, this.state.totalPages);
        if (xCount <= (this.state.totalPages - 1)) {
            axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}&page=${xCount}${this.state.toSendQuery}${this.state.mainFilterQuery}`)
                .then(res => {
                    console.log("response on rightPagination : ", res);
                    this.setState({
                        countPages: xCount,
                        totalPages: this.props.attandanceHistory ? 1 : res.data.page.totalPages,
                        pageSize: this.props.attandanceHistory ? 10 : res.data.page.size,
                        totalElements: this.props.attandanceHistory ? 10 : res.data.page.totalElements,
                        takeAttandanceListData: res.data._embedded ? res.data._embedded[this.state.listName] : []
                    });
                })
                .catch(e => {
                    console.log("error occured in rightPagination : ", e, this.state.takeAttandanceListData);
                });
        }
        else {
            console.log("countPages reaches limit :", this.state.countPages);
        }
    }

    // ............Handling left Pagination.....................
    handelPagintionLeft = () => {
        let xCount = this.state.countPages - 1;
        if (xCount >= 0) {
            console.log("clicked handelPagintionLeft and countPage is : ", xCount);
            axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}&page=${xCount}${this.state.toSendQuery}${this.state.mainFilterQuery}`)
                .then(res => {
                    console.log("response on leftPagination : ", res);
                    this.setState({
                        countPages: xCount,
                        totalPages: this.props.attandanceHistory ? 1 : res.data.page.totalPages,
                        pageSize: this.props.attandanceHistory ? 10 : res.data.page.size,
                        totalElements: this.props.attandanceHistory ? 10 : res.data.page.totalElements,
                        takeAttandanceListData: res.data._embedded ? res.data._embedded[this.state.listName] : []
                    });
                })
                .catch(e => {
                    console.log("error occured in leftPagination : ", e, this.state.takeAttandanceListData);
                });
        }
        else {
            console.log("countPages limit :", this.state.countPages);
        }
    }

    editSearchTerm = (e) => {
        this.setState({ searchTerm: e.target.value });
    }

    // ............Data passed as prop in TakeAttandance / Search filter....................
    dynamicData = () => {
        return (this.state.searchTerm ?
            this.state.takeAttandanceListData.filter(ob => (
                ob.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                ob.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                (ob.userId && ob.userId.toString().includes(this.state.searchTerm.toString()))
            ))
            :
            this.state.takeAttandanceListData
        )
    }

    // ............Browse Filter Handel....................
    handelBrowseFilter = (e) => {
        e.stopPropagation();
        const checked = e.target.checked;
        const id = e.target.getAttribute("id");
        const index = e.target.getAttribute("index");
        const dataType = e.target.getAttribute("data-type");
        console.log(" dataType, index, id, checked inside handelBrowseFilter :", dataType, index, id, checked);

        let filterObj = this.state.filterObj;
        filterObj[dataType][index].name = checked;

        // ........Parameters to send along with api................
        let query = this.state.toSendQuery;

        if (checked) {
            query = query.concat(`&search=${dataType}:${id}`);
        }
        else {
            query = query.replace(`&search=${dataType}:${id}`, '');
        }
        console.log("query, filterObj inside handelBrowseFilter :", query, filterObj);

        // .........Getting Filtered Data form Api..................
        axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}${query}${this.state.mainFilterQuery}${this.state.timeQuery}`)
            .then(res => {
                console.log("responce of Filter is :", res);
                this.setState({
                    countPages: 0,
                    filterObj: filterObj,
                    filterTerm: true,
                    toSendQuery: query,
                    totalPages: this.props.attandanceHistory ? 1 : res.data.page.totalPages,
                    pageSize: this.props.attandanceHistory ? 10 : res.data.page.size,
                    totalElements: this.props.attandanceHistory ? 10 : res.data.page.totalElements,
                    takeAttandanceListData: res.data._embedded ? res.data._embedded[this.state.listName] : []
                });
            })
            .catch(e => console.log("An eror occured while calling filter Attandace Api :", e));

    }


    helpSort = (sortBy, ascDec) => {
        let sortedList;
        let type = {
            firstName: "firstName",
            lastName: "lastName",
            rollNumber: "rollNumber",
        };
        const selectedType = type[sortBy];
        console.log("e.target.value, selectedType", ascDec, selectedType);
        if (ascDec === "ascending") {
            sortedList = selectedType === "rollNumber" ? this.state.takeAttandanceListData.sort((a, b) => a[selectedType] - b[selectedType])
                : this.state.takeAttandanceListData.sort((a, b) => a[selectedType].localeCompare(b[selectedType]));
        }
        else {
            sortedList = selectedType === "rollNumber" ? this.state.takeAttandanceListData.sort((a, b) => b[selectedType] - a[selectedType])
                : this.state.takeAttandanceListData.sort((a, b) => b[selectedType].localeCompare(a[selectedType]));
        }
        console.log("sortedList after helpSort is : ", sortedList);
    }
    
    handelSort = (e) => {
        const value = e.target.value;
        const sortType = this.state.ascDec;
        this.helpSort(value, sortType);

        this.setState({ sortBy: value });
    }

    handelAscDec = (e) => {
        const value = e.target.value;
        const sortBy = this.state.sortBy;
        this.helpSort(sortBy, value);

        this.setState({ ascDec: value });
    }


    filterByDate = () => {
        // ............Empty the toSaveList in child(takeAttandance)......................
        this.AttandanceChild.state.toSaveList = [];

        let date = this.state.dateToPost.split(" ");
        let startDate = date[0];
        let endDate = date[4];
        let responceData = [];
        console.log("startDate, endDate", date, startDate, endDate);

        let timeQuery = `&period=C&value=${startDate + "," + endDate}`;

        axios.get(`${this.state.UserOrAttandanceApi}?${this.state.toSendQuery}${this.state.mainFilterQuery}${timeQuery}`)
        .then(res => {
            responceData = res.data._embedded[this.state.listName];
            console.log("Responce Inside filterByDate :", res, responceData);
        })
        .catch(e => {
            console.log("error catched Inside filterByDate :", e);
        });

        setTimeout(() => {
            this.setState({showDateRangePicker: false, timeQuery: timeQuery, takeAttandanceListData: responceData, totalPages: 1});
        }, 1000);
    }

    filterDate = (date) => {

        let startDateObj = moment(date[0]["startDate"]).format("DD-MM-YYYY");
        let endDateObj = moment(date[0]["endDate"]).format("DD-MM-YYYY");

        let dateToPost = startDateObj + "  to  " + endDateObj;
        console.log("dateToPost : ", dateToPost);
        
        this.setState({dateToPost : dateToPost});
    }

    //.............This function is called when query come from mainFilter...................
    mainFilterQuery = (query) => {
        axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}${this.state.toSendQuery}${query}${this.state.timeQuery}`)
            .then(res => {
                console.log("responce of Filter is :", res);
                this.setState({
                    totalPages: this.props.attandanceHistory ? 1 : res.data.page.totalPages,
                    pageSize: this.props.attandanceHistory ? 10 : res.data.page.size,
                    totalElements: this.props.attandanceHistory ? 10 : res.data.page.totalElements,
                    takeAttandanceListData: res.data._embedded ? res.data._embedded[this.state.listName] : []
                });
            })
            .catch(e => console.log("An eror occured while calling filter Attandace Api :", e));

        this.setState({mainFilterQuery : query});
    }



    render() {

        const { takeAttandance, attandanceHistory, toogleListGrid, hideGridView, listOrGrid } = this.props;

        const {countPages, totalPages, allFilters} = this.state;

        let userTypes = allFilters.userTypes && (
                            <div className="filter-userTypes mx-2">
                                <p className="dropdown-item text-dark" aria-disabled><b>User Type</b></p>
                                {allFilters.userTypes.map((data, index) => (
                                    <span key={"userType" + index} className="d-flex">
                                        <input type="checkbox" name={enums[data].toLowerCase()} id={data} index={index} data-type="userType" checked={this.state.filterObj.userType[index].name} onChange={this.handelBrowseFilter} />
                                        <label className="dropdown-item" htmlFor={data} aria-disabled><p>{enums[data]}</p></label>
                                    </span>
                                ))}
                            </div>
                        );

        let departments = allFilters.departments && (
                                <div className="filter-departments mx-2">
                                    <p className="dropdown-item text-dark" aria-disabled><b>Department</b></p>
                                    {allFilters.departments.map((data, index) => (
                                        <span key={"departments" + index} className="d-flex">
                                            <input type="checkbox" name={data.name.toLowerCase()} id={data.id} index={index} data-type="department" checked={this.state.filterObj.department[index].name} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" htmlFor={data.id} aria-disabled><p>{data.name.charAt(0).toUpperCase() + data.name.slice(1).toLowerCase()}</p></label>
                                        </span>
                                    ))}
                                </div>
                            );

        let classes = allFilters.classes && (
                            <div className="filter-classes mx-2">
                                <p className="dropdown-item text-dark" aria-disabled><b>Classes</b></p>
                                {allFilters.classes.map((data, index) => (
                                    <span key={"classes" + index} className="d-flex">
                                        <input type="checkbox" name={data.name} id={data.id} index={index} data-type="class" checked={this.state.filterObj.class[index].name} onChange={this.handelBrowseFilter} />
                                        <label className="dropdown-item" htmlFor={data.id} aria-disabled><p>{data.name}</p></label>
                                    </span>
                                ))}
                            </div>
                        );

        let subjects = allFilters.subjects && (
                            <div className="filter-subjects mx-2">
                                <p className="dropdown-item text-dark" aria-disabled><b>Subjects</b></p>
                                {allFilters.subjects.map((data, index) => (
                                    <span key={"subjects" + index} className="d-flex">
                                        <input type="checkbox" name={data.name} id={data.id} index={index} data-type="subject" checked={this.state.filterObj.subject[index].name} onChange={this.handelBrowseFilter} />
                                        <label className="dropdown-item" htmlFor={data.id} aria-disabled><p>{data.name}</p></label>
                                    </span>
                                ))}
                            </div>
                        );


        return (

            <>  {console.log("inside filter return and count is : ", countPages)}
                <div className="d-flex ml-5 pt-2 mt-3 justify-content-between whole-filter">

                    {/* .....................................Browse............................................... */}
                    <div className="d-flex filter-text pl-1 mt-1">
                        <div className="mr-2 users-text-filter">Users</div>
                        {/* .................Dropdown 1................... */}
                        <div className="dropdown browse">
                            <button className="btn btn-sm browse-button btn-outline-none align-top p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Browse
                            </button>
                            <div className="dropdown-menu filter-dropdown1" onClick={(e) => e.stopPropagation()}>
                                <div className="d-flex browse-filters justify-content-space-between">
                                    {/* ............UserType............ */}
                                    {userTypes}
                                    
                                    {/* ............Departments............ */}
                                    {departments}

                                    {/* ............Classes............ */}
                                    {classes}

                                    {/* ............Subjects............ */}
                                    {subjects}

                                </div>

                            </div>
                        </div>
                    </div>

                    {/* .....................................Sort By............................................... */}
                    <div className="d-flex filter-text ml-5 mt-1">
                        <div className="ml-1 mr-2 users-text-filter">Sort by</div>
                        {/* .............Dropdown 2.............. */}
                        <div className="dropdown">
                            <button className="btn btn-sm btn-outline-none p-0 align-top dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User Type
                            </button>
                            <div className="dropdown-menu user-type-dropdown filter-dropdown2 take-attandance-filter" onClick={(e) => e.stopPropagation()} aria-labelledby="dropdownMenuButton">
                                <span className="d-flex">
                                    <input type="radio" name="r" id="r1" value="firstName" checked={this.state.sortBy === "firstName"} onChange={this.handelSort} />
                                    <label className="dropdown-item" htmlFor="r1" aria-disabled><p>First Name</p></label>
                                </span>
                                <span className="d-flex">
                                    <input type="radio" name="r" id="r2" value="lastName" checked={this.state.sortBy === "lastName"} onChange={this.handelSort} />
                                    <label className="dropdown-item" htmlFor="r2" aria-disabled><p>Last Name</p></label>
                                </span>
                                {takeAttandance && <span className="d-flex">
                                    <input type="radio" name="r" id="r3" value="rollNumber" checked={this.state.sortBy === "rollNumber"} onChange={this.handelSort} />
                                    <label className="dropdown-item" htmlFor="r3" aria-disabled><p>Roll No</p></label>
                                </span>}
                                <br />
                                <span className="d-flex">
                                    <input type="radio" name="rd" id="r5" value="ascending" checked={this.state.ascDec === "ascending"} onChange={this.handelAscDec} />
                                    <label className="dropdown-item" htmlFor="r5"><p>Ascending</p></label>
                                </span>
                                <span className="d-flex">
                                    <input type="radio" name="rd" id="r6" value="decending" checked={this.state.ascDec === "decending"} onChange={this.handelAscDec} />
                                    <label className="dropdown-item" htmlFor="r6" aria-disabled><p>Decending</p></label>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* .......................Search Icon.............................. */}
                    <div className="form-group filter-search mb-0 mr-0">
                        <span className="fa fa-search search-icon"></span>
                        <input type="text" className="form-control" placeholder="Search User" value={this.state.searchTerm} onChange={this.editSearchTerm} style={{ fontSize: "1.4rem" }} />
                    </div>

                    {/* .......................Date Range Picker.............................. */}
                    {attandanceHistory && 
                        <>
                            <div className="d-flex date-picker">
                                <i className="fas fa-calendar-alt date-picker-icon pt-1" onClick={() => this.setState({showDateRangePicker : !(this.state.showDateRangePicker)})} />
                                <input className="form-control date-picker-input" type="text" name="date-range" value={this.state.dateToPost} onClick={() => this.setState({showDateRangePicker : !(this.state.showDateRangePicker)})} readOnly />
                                <button className="dir-dots apply-date-range-button" onClick={this.filterByDate}>Apply</button>
                            </div>

                            {this.state.showDateRangePicker && <CalanderApplyLeave obtainDates={(date) => this.filterDate(date)} />}
                            
                        </>
                    }

                    {/* .......................Paginations.............................. */}
                    <div className="d-flex pagination mr-5">
                        {!(attandanceHistory) && 
                            <>
                                <div className="pagination-text mr-4 mt-1">{this.state.countPages === 0 ? 1 : (this.state.countPages * this.state.pageSize) + 1} to {(this.state.countPages === 0) ? (this.state.takeAttandanceListData.length) : (this.state.countPages * this.state.pageSize) + (this.state.takeAttandanceListData.length) } of {this.state.totalPages * this.state.pageSize}</div>
                                <button className="btn btn-sm btn-outline-secondary pagination-button bg-white ml-4" onClick={this.handelPagintionLeft}><i className="fa fa-chevron-left pagination-i"></i></button>
                                <button className="btn btn-sm btn-outline-secondary pagination-button bg-white" onClick={this.handelPagintionRight}><i className="fa fa-chevron-right pagination-i"></i></button>
                            </>
                        }

                        {/* .......................List/Grid view Icon.............................. */}
                        {hideGridView ? <div className="mr-5 pr-3"></div>
                            :
                            <span className="list-grid mr-4">
                                {
                                    listOrGrid ?
                                        <i className="fa fa-th ml-4" onClick={toogleListGrid} style={{ fontSize: "2.8rem", cursor: "pointer" }}></i>
                                        :
                                        <i className="fas fa-list ml-4" onClick={toogleListGrid} style={{ fontSize: "2.5rem", cursor: "pointer" }}></i>
                                }
                            </span>
                        }

                        {/* .......................Filter Icons.............................. */}
                        <i className="fas fa-filter mr-2" onClick={() => this.setState({ showFilters: true })} style={{ position: "inherit", fontSize: "2.5rem", cursor: "pointer" }}></i>

                        {/* .......................Filter model.............................. */}
                        <FilterModel show={this.state.showFilters} allFilters={allFilters} query={(query) => {this.mainFilterQuery(query)}} hide={() => this.setState({ showFilters: false })} />

                    </div>

                </div>

                {takeAttandance ? 
                    <TakeAttandance paginationData={this.dynamicData()} pageNo={countPages} totalPages={totalPages} switched={this.state.switched} onRef={(ref) => {this.AttandanceChild = ref}} attandanceHistory={attandanceHistory} />
                : 
                    <> <ItemDetails /> {listOrGrid ? <GridViewUser paginationData={this.dynamicData()} pageNo={countPages} totalPages={totalPages} onRef={(ref) => {this.UseChild = ref}} /> : <ListViewUser paginationData={this.dynamicData()} pageNo={countPages} totalPages={totalPages} />} </>
                }


            </>
        );
    }
}




export default FilterBar
