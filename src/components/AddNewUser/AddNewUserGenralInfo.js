





import axios from '../axios';
import React, { Component } from 'react'
import "./AddNewUserGenralInfo.css";


class AddNewUserGenralInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            middleName: "",
            contactDTO: {
                phone: "",
                email: "",
                alternatePhone: "",
                alternateEmail: ""
            },
            communicationAddress: {
                line1: "",
                line2: "",
                state: "",
                zipcode: "",
                country: ""
            },
            departments: "",                  //....[36] for student
            classSectionId: "",
            rollNumber: "",
            activeStatus: false,
            employeeOrgId: "",
            reportingManagerId: "",
            designation: "",
            selectDropdown: [],
            managerList: []
        };

        this.submitGenralInfoForm = this.submitGenralInfoForm.bind(this)
    }

    componentDidMount() {
        var selectDropdown;
        console.log("this.props.userType in componentDidMunt :", this.props.userType);
        let searchType = this.props.userType == "S" ? "/classes" : "/departments";
        let searchName = this.props.userType == "S" ? "instituteClassSectionDTOList" : "instituteDepartmentDTOList";
        axios.get(searchType)
            .then(res => {
                console.log(`${searchType} responce :`, res);
                selectDropdown = res.data._embedded[searchName];
                console.log(`${searchType} selectDropdown :`, selectDropdown);
                this.setState({selectDropdown : selectDropdown});
            })
            .catch(e => console.log(`${searchType} error :`, e));
    }

    
    handelReportingManager = (e, data) => {
        let value = e.target.value;
        let managerList = [];
        console.log("In handelReportingManager value api :", value);

        axios.get(`/users/employees?search=${value}`)
        .then((res) => {
            managerList = res.data;
            console.log("Responce in reporting manager api :", res, managerList);
            this.setState({managerList: managerList});
        })
        .catch((e) => console.log("Error caught in reporting manager api :", e));
    }

    submitGenralInfoForm(e) {
        console.log("Genral info is :", this.state);
        e.preventDefault();
        this.props.switch(this.state);
    }


    render() {

        let type = this.props.userType;

        return (
            <>

            <div className="input-width">
                <div className="required-fields"><b>Note: </b>All fields are important(required)!</div>
                <form onSubmit={this.submitGenralInfoForm}>
                    {/* .........................Personal Details..................................... */}
                    <div className="d-flex pt-4 ml-2">
                        <input className="Add-New-input mr-5" type="text" name="firstname" value={this.state.firstName} onChange={(e) => this.setState({firstName : e.target.value})} placeholder="First Name" required />
                        <input className="Add-New-input ml-5" type="text" name="middlename" value={this.state.middleName} onChange={(e) => this.setState({middleName : e.target.value})} placeholder="Middle Name" />
                    </div>

                    <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="lastname" value={this.state.lastName} onChange={(e) => this.setState({lastName : e.target.value})} placeholder="Last Name" />  </div>


                    {/* .........................Contact Details..................................... */}
                    <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Contact Details</p></div>

                    {/* ....Email/phone..... */}
                    <div className="d-flex pt-1 ml-2">
                        <input className="Add-New-input mr-5" type="email" name="officialemail" value={this.state.contactDTO.email} onChange={(e) => this.setState((state) => (state.contactDTO.email = e.target.value, state))} placeholder="Oficial Email" required />
                        <input className="Add-New-input ml-5" type="tel" maxLength="10" name="phoneno" value={this.state.contactDTO.phone} onChange={(e) => this.setState((state) => (state.contactDTO.phone = e.target.value, state))} placeholder="Phone No." required />
                    </div>
                    {/* ....Alernate Email/phone..... */}
                    <div className="d-flex pt-1 ml-2">
                        <input className="Add-New-input mr-5" type="email" name="alternate-email" value={this.state.contactDTO.alternateEmail} onChange={(e) => this.setState((state) => (state.contactDTO.alternateEmail = e.target.value, state))} placeholder="Alternate Email" />
                        <input className="Add-New-input ml-5" type="tel" maxLength="10" name="alternate-phoneno" value={this.state.contactDTO.alternatePhone} onChange={(e) => this.setState((state) => (state.contactDTO.alternatePhone = e.target.value, state))} placeholder="Alternate Phone No." />
                    </div>

                    {/* .........................Address Details..................................... */}
                    <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Communication Address</p></div>

                    {/* ....Line1/Line2..... */}
                    <div className="d-flex pt-1 ml-2">
                        <input className="Add-New-input mr-5" type="text" name="line1" value={this.state.communicationAddress.line1} onChange={(e) => this.setState((state) => (state.communicationAddress.line1 = e.target.value, state))} placeholder="Address Line1" required />
                        <input className="Add-New-input ml-5" type="text" maxLength="20" name="line2" value={this.state.communicationAddress.line2} onChange={(e) => this.setState((state) => (state.communicationAddress.line2 = e.target.value, state))} placeholder="Address Line2" />
                    </div>
                    {/* ....State/Zipcode..... */}
                    <div className="d-flex pt-1 ml-2">
                        <input className="Add-New-input mr-5" type="text" name="state" value={this.state.communicationAddress.state} onChange={(e) => this.setState((state) => (state.communicationAddress.state = e.target.value, state))} placeholder="State" required />
                        <input className="Add-New-input ml-5" type="text" maxLength="6" name="zipcode" value={this.state.communicationAddress.zipcode} onChange={(e) => this.setState((state) => (state.communicationAddress.zipcode = e.target.value, state))} placeholder="Zipcode" required />
                    </div>
                    {/* ....Country..... */}
                    <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="country" value={this.state.communicationAddress.country} onChange={(e) => this.setState((state) => (state.communicationAddress.country = e.target.value, state))} placeholder="Country" required /></div>

                    {/* .........................Reporting Information..................................... */}
                    {type === "E" && <>
                        <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Reporting Information</p></div>
                        <div className="d-flex add-reporting-manager pt-1 ml-2">
                            <input className="Add-New-input" type="text" list="reprotingManagerList" name="reproting-manager" placeholder="Reproting Manager" value={this.state.reportingManagerId} onChange={(e) => this.setState({reportingManagerId: e.target.value})} onKeyUp={this.handelReportingManager} required />
                            <datalist id="reprotingManagerList">
                                <select>
                                <option value="" disabled>--Select a Reporting Manager--</option>
                                {this.state.managerList.map((data, index) => (
                                    <>
                                        <option key={index + 100} value={data.id}>{data.name} {(data.designation === "None" ? `` : (` - ` + data.designation)) + ` - ` + data.employeeOrgId}</option>
                                    </>
                                ))}
                                </select>
                            </datalist>
                        </div>

                    </>}

                    {/* .........................System Information..................................... */}
                    {type === "E" &&
                        (<>
                            <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">System Information</p></div>
                            
                            <div className="d-flex pt-1 ml-2">
                                <select className="Add-New-input" id="departments" name="departments" value={this.state.departments} onChange={(e) => {this.setState({ departments: e.target.value })}} required>
                                <option value="" disabled>--Select a Department--</option>
                                    {this.state.selectDropdown.map((data, index) => (
                                        <option key={index} value={data.id}>{data.departmentName}</option>
                                    ))}

                                </select>
                            </div>

                            <div className="d-flex pt-1 ml-2">
                                <input className="Add-New-input mr-5" type="text" name="employeeOrgId" placeholder="employeeOrgIdUser" value={this.state.employeeOrgId} onChange={(e) => {this.setState({ employeeOrgId: e.target.value })}} required />
                                <input className="Add-New-input mr-5" type="text" name="User-designation" placeholder="Designation" value={this.state.designation} onChange={(e) => {this.setState({ designation: e.target.value })}} required />
                            </div>
                        </>)
                    }

                    {/* .........................Acadmics Information..................................... */}
                    {type === "S" &&
                    <><div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">Acadmics Information</p></div>
                        <div className="d-flex pt-1 ml-2">
                            <select className="Add-New-input" id="classSectionId" name="classSectionId" value={this.state.classSectionId} onChange={(e) => {this.setState({ classSectionId: e.target.value })}} required>
                                <option value="" disabled>--Select a Class--</option>
                                {this.state.selectDropdown.map((data, index) => (
                                    <option key={index} value={data.instituteClassSectionId}>{data.className} {data.sectionName}</option>
                                ))}
                            </select>
                        </div>
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="rollno" value={this.state.rollNumber} onChange={(e) => this.setState({rollNumber : e.target.value})} placeholder="Roll No." required /></div>
                    </>}

                    {/* .........................User Status..................................... */}
                    <div className="d-flex pt-2 mt-5"><p className="Add-New-genral-heading">User Status</p></div>

                    <div className="d-flex pt-1 ml-2">
                        <label className="switch mt-4 pl-4 ml-5">
                            <input type="checkbox" checked={this.state.activeStatus} onChange={(e) => {this.setState({activeStatus : e.target.checked})}} />
                            <span className="slider round"></span>
                        </label>
                    </div>

                    {/* .........................Buttons at end..................................... */}
                    <div className="d-flex pt-1 justify-content-end mt-5 pt-4 mr-5 pr-5">
                        {/* <button className="Add-New-input-button-cencel">Cencel</button> */}
                        <button type="Submit" className="Add-New-input-button-save mr-5">Save &amp; Next</button>
                    </div>
                </form>

            </div>

        </>
        )
    }
}



export default AddNewUserGenralInfo
