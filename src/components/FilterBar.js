




import React from 'react';

import "./FilterBar.css";
import axios from "./axios";
import ApiCalls from "./ApiCalls";
import FilterModel from './FilterModel';
import ItemDetails from './ItemDetails';
import TakeAttandance from './TakeAttandance/TakeAttandance';
import ListOrGrid from './ListOrGrid';
import GridViewUser from './GridView/GridViewUser';
import ListViewUser from './ListViewUser';


class FilterBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            UserOrAttandanceApi: "",
            listName: "",
            size: "",
            showFilters: false,
            totalPages: 1,
            countPages: 0,
            pageSize: 0,
            totalElements: 0,
            takeAttandanceListData: [],
            searchTerm: '',
            filterObj: {
                userType: {
                    student: false,
                    teacher: false,
                    admin: false,
                    parent: false
                },
                departmant: {
                    botany: false,
                    chemistry: false,
                    zoology: false,
                    pmcs: false,
                    biochemistry: false,
                    biotechnology: false,
                    physics: false
                },
                userRoll: {
                    roleStudent: false,
                    pgtEnglish: false,
                    tgtBio: false,
                    tgtMaths: false
                }
            },
            filterTerm: false,
            toSendQuery: "",
            ascDec: "ascending",
            sortBy: "rollNumber"
        }
    }
    
    static getDerivedStateFromProps(props, state) {
        const UserOrAttandanceApi = props.takeAttandance ? ApiCalls.attendanceUsers : ApiCalls.listUsers;
        const listName = props.takeAttandance ? "userAttendanceResponseDTOList" : "userDTOList";
        const size = props.takeAttandance ? 6 : 10;
        console.log("UserOrAttandanceApi, listName, size inside getDerivedStateFromProps : ", UserOrAttandanceApi, listName, size);
        return {
            UserOrAttandanceApi: UserOrAttandanceApi,
            listName: listName,
            size: size
        }
    }

    componentDidMount() {
        // console.log("takeAttandanceListData inside componentDidMount: ", this.state.takeAttandanceListData);
        console.log("UserOrAttandanceApi, listName, size inside componentDidMount : ", this.UserOrAttandanceApi, this.listName, this.size);
        if (this.state.takeAttandanceListData.length === 0) {
            console.log("inside if of componentDidMount: ", this.state.takeAttandanceListData);
            this.takeAttandanceList(this.state.UserOrAttandanceApi, this.state.listName, this.state.size);
        };
    }


    // ...........................Initial Attandance Api Data.....................................
    takeAttandanceList(UserOrAttandanceApi, listName, size) {
        try {
            console.log("takeAttandanceListData at the very begning is: ", this.state.takeAttandanceListData);
            console.log("url:", "attandance/takeattandance, ", UserOrAttandanceApi);
            axios.get(UserOrAttandanceApi + `?size=` + size)
                .then(responce => {
                    console.log("AttandanceUsers responce:", responce);
                    this.setState({
                        totalPages: responce.data.page.totalPages,
                        pageSize: responce.data.page.size,
                        totalElements: responce.data.page.totalElements,
                        takeAttandanceListData: responce.data._embedded[listName]
                    });
                })
                .catch(error => {
                    console.log("Something went wrong with AttandanceUsers Api", error);
                });
        }
        catch (error) {
            console.log("Error catched while calling AttandanceUsers Api", error);
        }
    }

    // ............Handling right Pagination.....................
    handelPagintionRight = () => {
        let xCount = this.state.countPages + 1;
        console.log("in handelPagintionRight countPages, totalPAges are :", xCount, this.state.totalPages);
        if (xCount <= (this.state.totalPages - 1)) {
            axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}&page=${xCount}`)
                .then(res => {
                    console.log("response on rightPagination : ", res);
                    this.setState({
                        countPages: xCount,
                        totalElements: res.data.page.totalElements,
                        takeAttandanceListData: res.data._embedded[this.state.listName]
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
            axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}&page=${xCount}`)
                .then(res => {
                    console.log("response on leftPagination : ", res);
                    this.setState({
                        countPages: xCount,
                        totalElements: res.data.page.totalElements,
                        takeAttandanceListData: res.data._embedded[this.state.listName]
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

    // ............Data to be displayed / Search filter....................
    dynamicData = () => {
        return (this.state.searchTerm ?
            this.state.takeAttandanceListData.filter(ob => (
                ob.firstName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                ob.lastName.toLowerCase().includes(this.state.searchTerm.toLowerCase()) ||
                ob.userId && ob.userId.toString().includes(this.state.searchTerm.toString())
            ))
            :
            this.state.takeAttandanceListData
        )
    }

    // ............Browse Filter Handel....................
    handelBrowseFilter = (e) => {
        e.stopPropagation();
        const name = e.target.name;
        const checked = e.target.checked;
        const dataType = e.target.getAttribute("dataType");
        console.log(" dataType, name, checked inside handelBrowseFilter :", dataType, name, checked);

        let filterObj = this.state.filterObj;
        filterObj[dataType][name] = checked;

        let query = this.state.toSendQuery;
        if (checked) {
            query = query.concat(`&search=${dataType}:${name}`);
        }
        else {
            query = query.replace(`&search=${dataType}:${name}`, '');
        }
        console.log("query, filterObj inside handelBrowseFilter :", query, filterObj);

        // .........Getting Filtered Data form Api..................
        axios.get(this.state.UserOrAttandanceApi + `?size=${this.state.size}${query}`)
            .then(res => console.log("responce of Filter is :", res))
            .catch(e => console.log("An eror occured while calling filter Attandace Api :", e));

        this.setState({ filterObj: filterObj, filterTerm: true, toSendQuery: query });
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



    render() {

        const { takeAttandance, toogleListGrid, hideGridView, listOrGrid } = this.props;

        return (

            <>  {console.log("inside filter return and count is : ", this.state.countPages)}
                <div className="d-flex ml-5 pt-2 mt-3 justify-content-between">
                    <div className="d-flex filter-text pl-1 mt-1">
                        <div className="mr-2 users-text-filter">Users</div>
                        {/* ......................Dropdown 1........................ */}
                        <div className="dropdown browse">
                            <button className="btn btn-sm browse-button btn-outline-none align-top p-0 dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                Browse
                            </button>
                            <div className="dropdown-menu filter-dropdown1" onClick={(e) => e.stopPropagation()}>
                                <div className="d-flex">

                                    <div className="col-4">
                                        <p className="dropdown-item text-dark" aria-disabled><b>User Type</b></p>
                                        <span className="d-flex">
                                            {console.log("this.state.filterObj['student'] is:", this.state.filterObj)}
                                            <input type="checkbox" name="student" id="c1" dataType="userType" checked={this.state.filterObj.userType.student} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c1" aria-disabled><p>Student</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="teacher" id="c2" dataType="userType" checked={this.state.filterObj.userType.teacher} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c2" aria-disabled><p>Teacher</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="admin" id="c3" dataType="userType" checked={this.state.filterObj.userType.admin} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c3" aria-disabled><p>Admin</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="parent" id="c4" dataType="userType" checked={this.state.filterObj.userType.parent} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c4" aria-disabled><p>Parent</p></label>
                                        </span>
                                    </div>

                                    <div className="col-4 pl-0 pb-5 mb-3">
                                        <p className="dropdown-item text-dark" aria-disabled><b>Department</b></p>
                                        <span className="d-flex">
                                            <input type="checkbox" name="botany" id="c5" dataType="departmant" checked={this.state.filterObj.departmant.botany} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c5" aria-disabled><p>Botany</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="chemistry" id="c6" dataType="departmant" checked={this.state.filterObj.departmant.chemistry} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c6" aria-disabled><p>Chemistry</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="zoology" id="c7" dataType="departmant" checked={this.state.filterObj.departmant.zoology} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c7" aria-disabled><p>Zoology</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="pmcs" id="c8" dataType="departmant" checked={this.state.filterObj.departmant.pmcs} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c8" aria-disabled><p>PMCS</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="biochemistry" id="c9" dataType="departmant" checked={this.state.filterObj.departmant.biochemistry} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c9" aria-disabled><p>Biochemistry</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input className="error-check-box" type="checkbox" name="biotechnology" id="c10" dataType="departmant" checked={this.state.filterObj.departmant.biotechnology} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c10" aria-disabled><p>Biotechnology</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="physics" id="c11" dataType="departmant" checked={this.state.filterObj.departmant.physics} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c11" aria-disabled><p>Physics</p></label>
                                        </span>

                                    </div>
                                    <div className="col-4 pr-5 pl-1">
                                        <p className="dropdown-item text-dark" aria-disabled><b>User Role</b></p>
                                        <span className="d-flex">
                                            <input type="checkbox" name="roleStudent" id="c12" dataType="userRoll" checked={this.state.filterObj.userRoll.roleStudent} onChange={this.handelBrowseFilter} dataType="userRoll" checked={this.state.filterObj.userRoll.roleStudent} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c12" aria-disabled><p>Student</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="pgtEnglish" id="c13" dataType="userRoll" checked={this.state.filterObj.userRoll.pgtEnglish} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c13" aria-disabled><p>PGT Eng</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="tgtBio" id="c14" dataType="userRoll" checked={this.state.filterObj.userRoll.tgtBio} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c14" aria-disabled><p>TGT Bio</p></label>
                                        </span>
                                        <span className="d-flex">
                                            <input type="checkbox" name="tgtMaths" id="c15" dataType="userRoll" checked={this.state.filterObj.userRoll.userRoll} onChange={this.handelBrowseFilter} />
                                            <label className="dropdown-item" for="c15" aria-disabled><p>TGT Maths</p></label>
                                        </span>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    {console.log("this.state.sortBy, this.state.ascDec", this.state.sortBy, this.state.ascDec)}
                    <div className="d-flex filter-text ml-5 mt-1">
                        <div className="ml-1 mr-2 users-text-filter">Sort by</div>
                        {/* ......................Dropdown 2........................ */}
                        <div className="dropdown">
                            <button className="btn btn-sm btn-outline-none p-0 align-top dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                User Type
                            </button>
                            <div className="dropdown-menu user-type-dropdown filter-dropdown2 take-attandance-filter" onClick={(e) => e.stopPropagation()} aria-labelledby="dropdownMenuButton">
                                <span className="d-flex">
                                    <input type="radio" name="r" id="r1" value="firstName" checked={this.state.sortBy === "firstName"} onChange={this.handelSort} />
                                    <label className="dropdown-item" for="r1" aria-disabled><p>First Name</p></label>
                                </span>
                                <span className="d-flex">
                                    <input type="radio" name="r" id="r2" value="lastName" checked={this.state.sortBy === "lastName"} onChange={this.handelSort} />
                                    <label className="dropdown-item" for="r2" aria-disabled><p>Last Name</p></label>
                                </span>
                                {takeAttandance && <span className="d-flex">
                                    <input type="radio" name="r" id="r3" value="rollNumber" checked={this.state.sortBy === "rollNumber"} onChange={this.handelSort} />
                                    <label className="dropdown-item" for="r3" aria-disabled><p>Roll No</p></label>
                                </span>}
                                <br />
                                <span className="d-flex">
                                    <input type="radio" name="rd" id="r5" value="ascending" checked={this.state.ascDec === "ascending"} onChange={this.handelAscDec} />
                                    <label className="dropdown-item" for="r5"><p>Ascending</p></label>
                                </span>
                                <span className="d-flex">
                                    <input type="radio" name="rd" id="r6" value="decending" checked={this.state.ascDec === "decending"} onChange={this.handelAscDec} />
                                    <label className="dropdown-item" for="r6" aria-disabled><p>Decending</p></label>
                                </span>
                            </div>
                        </div>
                    </div>
                    {/* .......................Search Icon.............................. */}
                    <div className="form-group filter-search mb-0 mr-0">
                        <span className="fa fa-search search-icon"></span>
                        <input type="text" className="form-control" placeholder="Search User" value={this.state.searchTerm} onChange={this.editSearchTerm} style={{ fontSize: "1.4rem" }} />
                    </div>
                    {/* .......................Paginations.............................. */}
                    <div className="d-flex pagination mr-5">
                        <div className="pagination-text mr-4 mt-1">{this.state.countPages == 0 ? 1 : (this.state.countPages * this.state.pageSize) + 1} to {this.state.countPages == this.state.totalPages ? this.state.totalPages : this.state.pageSize * (this.state.countPages + 1)} of {this.state.totalPages * this.state.pageSize}</div>
                        <button className="btn btn-sm btn-outline-secondary pagination-button bg-white ml-4" onClick={this.handelPagintionLeft}><i className="fa fa-chevron-left pagination-i"></i></button>
                        <button className="btn btn-sm btn-outline-secondary pagination-button bg-white" onClick={this.handelPagintionRight}><i className="fa fa-chevron-right pagination-i"></i></button>

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
                        <FilterModel show={this.state.showFilters} hide={() => this.setState({ showFilters: false })} />

                    </div>

                </div>

                {takeAttandance ? <TakeAttandance paginationData={this.dynamicData()} pageNo={this.state.countPages} totalPages={this.state.totalPages} /> : <> <ItemDetails /> {listOrGrid ? <GridViewUser paginationData={this.dynamicData()} pageNo={this.state.countPages} totalPages={this.state.totalPages} /> : <ListViewUser paginationData={this.dynamicData()} pageNo={this.state.countPages} totalPages={this.state.totalPages} />} </>}


            </>
        );
    }
}




export default FilterBar
