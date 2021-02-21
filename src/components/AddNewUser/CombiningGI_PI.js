





import moment from "moment";



function combinedGenPerInfo(genralInfo, personalInfo, userType) {
    
    console.log("Inside combinedGenPerInfo genralInfo, personalInfo, userType is :", genralInfo, personalInfo, userType);
    
    // .................For Student...................................
    let payload = {
        generalInformation: {
            firstName: genralInfo.firstName,
            lastName: genralInfo.lastName,
            middleName: genralInfo.middleName,
            contactDTO: {
                phone: genralInfo.contactDTO.phone,
                email: genralInfo.contactDTO.email,
                alternatePhone: genralInfo.contactDTO.alternatePhone,
                alternateEmail: genralInfo.contactDTO.alternateEmail
            },
            communicationAddress: {
                line1: genralInfo.communicationAddress.line1,
                line2: genralInfo.communicationAddress.line2,
                state: genralInfo.communicationAddress.state,
                zipcode: genralInfo.communicationAddress.zipcode,
                country: genralInfo.communicationAddress.country
            },
            departments: userType === "S" ? [36] : [genralInfo.departments],
            classSectionId: userType === "S" ? parseInt(genralInfo.classSectionId) : "",
            rollNumber: userType === "S" ? genralInfo.rollNumber : "",
            activeStatus: genralInfo.activeStatus,
            employeeOrgId: userType === "S" ? "" : genralInfo.employeeOrgId,
            reportingManagerId: userType === "S" ? "" : parseInt(genralInfo.reportingManagerId),
            designation: userType === "S" ? "" : genralInfo.designation,
        },
        personalInformation: {
            gender: personalInfo.gender,
            bloodGroup: personalInfo.bloodGroup,
            dob: moment(personalInfo.dob).format("DD-MM-YYYY"),
            homeAddress: {
                line1: personalInfo.homeAddress.line1,
                line2: personalInfo.homeAddress.line2,
                state: personalInfo.homeAddress.state,
                zipcode: personalInfo.homeAddress.zipcode,
                country: personalInfo.homeAddress.country
            },
            guardianName: personalInfo.guardianName,
            guardianRelation: personalInfo.guardianRelation,
            guardianMobileNo: personalInfo.guardianMobileNo
        }
    }


    return payload;
}


export default combinedGenPerInfo