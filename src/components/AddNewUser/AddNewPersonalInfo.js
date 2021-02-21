




import React, { Component } from 'react';
import "./AddNewPersonalInfo.css";
import CombiningGI_PI from "./CombiningGI_PI";
import axios from "../axios";

class AddNewPersonalInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            // displayName: "",
            gender: "",
            bloodGroup: "",
            dob: "",
            guardianName: "",
            guardianRelation: "",
            guardianMobileNo: "",
            homeAddress: {
                line1: "",
                line2: "",
                state: "",
                zipcode: "",
                country: ""
            },
            img1: "/images/upload_user_img.png",
            img2: "/images/upload_user_img.png",
            file1: "",
            file2: "",
        }

        this.handleImageChange = this.handleImageChange.bind(this)
    }


    handleImageChange(e) {
        let file = e.target.files[0];
        let img = e.target.name;
        let xFile = img === "img1" ? "file1" : "file2";
        console.log("img, xFile, files are :", img, xFile, file);

        this.setState({
            [img]: URL.createObjectURL(file),
            [xFile]: file
        })
    }


    submitFormInPersonalInfo = (e) => {
        e.preventDefault();
        let id;
        let payload = CombiningGI_PI(this.props.genralData, this.state, this.props.userType);
        console.log("I am in PersonalInformation payload is :", payload);


        //.............Submiting Genral and Personal Info....................................................
        axios.post("/users/" + this.props.userType, payload)
        .then((res) => {
            id = res.headers["user-id"];
            console.log("Data has been Successfully Submitted:", res.headers, id, res);
            alert("Data has been Successfully Submitted:");
        })
        .catch((e) => {
            console.log("Error catched while submitting the form:", e);
            alert("Error occured while Submiting form :");
        });


        //.............Uploaded Image1 (For System use)....................................................
        let file = this.state.file1;

        let formData = new FormData();
        formData.append('file', file);
        console.log("This ismy formData while uploading Display Image :", formData);

        
        setTimeout(() => {
            axios.put(`/users/${id}/upload?doc-type=DISPLAY`, formData, {
                headers: {
                    'Content-Type': 'multiplart/form-data',
                }
            })
            .then((res) => {
                console.log("Successfully uploaded DISPLAY image:", res);
                alert("Successfully uploaded DISPLAY image:");
            })
            .catch((e) => {
                console.log("Error catched while uploaded DISPLAY image:", e);
                alert("Error occured while uploaded DISPLAY image :");
            });
        }, 1000);

        //.............Uploaded Image2 (Passport Size)....................................................
        file = this.state.file2;

        formData = new FormData();
        formData.append('file', file);
        console.log("This ismy formData while uploading Passport Image :", formData);

        setTimeout(() => {
            axios.put(`/users/${id}/upload?doc-type=PASSPORT`, formData, {
                headers: {
                    'Content-Type': 'multiplart/form-data',
                }
            })
            .then((res) => {
                console.log("Successfully uploaded PASSPORT image:", res);
                alert("Successfully uploaded PASSPORT image:");
            })
            .catch((e) => {
                console.log("Error catched while uploaded PASSPORT image:", e);
                alert("Error occured while uploaded PASSPORT image :");
            });
        }, 1000);

        return false;
    }


    render() {

        return (
            <>
                <div className="Add-New pl-1">
                    <div className="required-fields pb-5"><b>Note: </b>All fields are important(required)!</div>
                    <form onSubmit={this.submitFormInPersonalInfo}>
                        {/* .........................Img upload..................................... */}
                        <div className="d-flex"><p className="Add-New-personal-heading mt-0">User Profile</p></div>
                        <div className="d-flex pt-1 ml-2">
                            <p className="Add-New-text ml-4">( For System )</p>
                            <p className="Add-New-text">( For Office Work, Passport Size )</p>
                        </div>
                        <div className="d-flex pt-1">
                            <img className='upload-img_icon ml-3 mr-5' src={this.state.img1} alt="Avatar" />
                            <img className='upload-img_icon ml-5' src={this.state.img2} alt="Avatar" />
                        </div>
                        <div className="d-flex pt-1">
                            <input type="file" className='upload-input_icon ml-3' accept='image/*' name="img1" onChange={this.handleImageChange} />
                            <input type="file" className='upload-input_icon ml-3 mr-1' accept='image/*' name="img2" onChange={this.handleImageChange} />
                        </div>


                        {/* .........................Basic Information..................................... */}
                        {/* <div className="d-flex mt-2 mb-4 ml-2"><input className="Add-New-input" type="text" placeholder="Display Name" value={this.state.displayName} onChange={(e) => { this.setState({ displayName: e.target.value }) }} required /></div> */}
                        <div className="d-flex mt-2 pt-1 ml-2">
                            <select className="Add-New-input select-gender" id="gender" name="gender" value={this.state.gender} onChange={(e) => { this.setState({ gender: e.target.value }) }} required>
                                <option value="" disabled>--Select Gender--</option>
                                <option value="male">Male</option>
                                <option value="female">Female</option>
                                <option value="others">Others</option>
                            </select>
                            <input className="Add-New-input ml-5" type="text" name="blood-group" placeholder="Blood Grop" value={this.state.bloodGroup} onChange={(e) => this.setState({ bloodGroup: e.target.value })} />
                        </div>
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="date" placeholder="DOB" value={this.state.dob} onChange={(e) => { this.setState({ dob: e.target.value }) }} required /></div>


                        {/* .........................Home Address..................................... */}
                        <div className="d-flex pt-1"><p className="Add-New-personal-heading">Home Address</p></div>
                        {/* ....Line1/Line2..... */}
                        <div className="d-flex pt-1 ml-2">
                            <input className="Add-New-input mr-5" type="text" name="line1" value={this.state.homeAddress.line1} onChange={(e) => this.setState((state) => (state.homeAddress.line1 = e.target.value, state))} placeholder="Address Line1" required />
                            <input className="Add-New-input ml-5" type="text" maxLength="20" name="line2" value={this.state.homeAddress.line2} onChange={(e) => this.setState((state) => (state.homeAddress.line2 = e.target.value, state))} placeholder="Address Line2" />
                        </div>
                        {/* ....State/Zipcode..... */}
                        <div className="d-flex pt-1 ml-2">
                            <input className="Add-New-input mr-5" type="text" name="state" value={this.state.homeAddress.state} onChange={(e) => this.setState((state) => (state.homeAddress.state = e.target.value, state))} placeholder="State" required />
                            <input className="Add-New-input ml-5" type="text" maxLength="6" name="zipcode" value={this.state.homeAddress.zipcode} onChange={(e) => this.setState((state) => (state.homeAddress.zipcode = e.target.value, state))} placeholder="Zipcode" required />
                        </div>
                        {/* ....Country..... */}
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="country" value={this.state.homeAddress.country} onChange={(e) => this.setState((state) => (state.homeAddress.country = e.target.value, state))} placeholder="Country" required /></div>


                        {/* .........................Gardian Information..................................... */}
                        <div className="d-flex pt-1"><p className="Add-New-personal-heading">Gardian Information</p></div>
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="gardian-name" placeholder="Gardian Name" value={this.state.guardianName} onChange={(e) => { this.setState({ guardianName: e.target.value }) }} required /></div>
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="text" name="gardian-relation" placeholder="Gardian Relation" value={this.state.guardianRelation} onChange={(e) => { this.setState({ guardianRelation: e.target.value }) }} required /></div>
                        <div className="d-flex pt-1 ml-2"><input className="Add-New-input" type="tel" maxLength="10" name="gardian-phone" placeholder="Gardian Mobile No." value={this.state.guardianMobileNo} onChange={(e) => { this.setState({ guardianMobileNo: e.target.value }) }} required /></div>


                        {/* .........................Save and cencil button..................................... */}
                        <div className="d-flex pt-1 justify-content-end mt-5 pt-4 mr-5 pr-5">
                            <button className="Add-New-input-button-cencel">Cencel</button>
                            <button type="submit" className="Add-New-input-button-save ml-3 mr-5">Save &amp; Next</button>
                        </div>

                    </form>

                </div>
            </>
        )
    }
}



export default AddNewPersonalInfo
