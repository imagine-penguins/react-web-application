





import decode from "jwt-decode";


const CheckAuth = () => {
    // const isAuthenticated = false;
    const token = JSON.parse(localStorage.getItem("storedData")) ? JSON.parse(localStorage.getItem("storedData"))[0] : '';
    const refreshToken = JSON.parse(localStorage.getItem("storedData")) ? JSON.parse(localStorage.getItem("storedData"))[1] : '';
    const userProfile = JSON.parse(localStorage.getItem("storedData")) ? JSON.parse(localStorage.getItem("storedData"))[2] : '';

    if(!token || !refreshToken){
        localStorage.removeItem('storedData');
        console.log("CheckAuth inside if token...");
        return false;
    }

    try{
        const refreshTokenExp = decode(refreshToken).exp;
        const tokenExp = decode(token).exp;
        console.log("refreshTokenExp, currentTime: ", refreshTokenExp, new Date().getTime() / 1000);
        if (refreshTokenExp < (new Date().getTime() / 1000)){
            localStorage.removeItem('storedData');
            console.log("CheckAuth inside if refreshTokenExp...");
            return false;
        }
    }
    catch(e) {
        console.log("Inside Catch of CheckAuthentication :", e);
        return false;
    }

    return true;
}


export default CheckAuth