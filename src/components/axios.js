




import axios from 'axios';
import decode from "jwt-decode";


// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5pc2hhIiwianRpIjoiMTciLCJzY29wZXMiOlsidmlldy1zZWxmLWF0dGVuZGFuY2UtaGlzdG9yeSIsIm1hcmstZW1wbG95ZWUtYXR0ZW5kYW5jZSIsIm1hcmstc3R1ZGVudC1hdHRlbmRhbmNlIiwiZWRpdC1zdHVkZW50LWF0dGVuZGFuY2UtaGlzdG9yeSIsImVkaXQtZW1wbG95ZWUtYXR0ZW5kYW5jZS1oaXN0b3J5IiwiYXBwbHktbGVhdmUtcmVxdWVzdCIsInVwZGF0ZS1sZWF2ZS1yZXF1ZXN0Iiwidmlldy1zZWxmLWF0dGVuZGFuY2UtaGlzdG9yeSIsInZpZXctc2VsZi1hdHRlbmRhbmNlLWhpc3RvcnkiLCJtYXJrLXN0dWRlbnQtYXR0ZW5kYW5jZSIsImVkaXQtc3R1ZGVudC1hdHRlbmRhbmNlLWhpc3RvcnkiLCJhcHBseS1sZWF2ZS1yZXF1ZXN0IiwidXBkYXRlLWxlYXZlLXJlcXVlc3QiXSwidXNlcnR5cGUiOiJFIiwiaW5zdGl0dXRlIjoxLCJpbnN0aXR1dGVDbGFzc1NlY3Rpb24iOjAsImlzcyI6ImltYWdpbmVwZW5ndWlucyIsImlhdCI6MTYwNzcwMjc1NSwiZXhwIjoxNjA3NzE3MTU1fQ.SxbbJurWjmtNt4K63AZFJhoHw0_VWpQRpK6Qdn-9HoduhhkCLvsQulHGuPCYBzmasbhz3qRqTw4M12uxS0gMyA";

// instance.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
// axios.defaults.baseURL = "http://ec2-13-126-215-181.ap-south-1.compute.amazonaws.com:8083/";


const instance = axios.create({
    baseURL: "http://ec2-13-126-215-181.ap-south-1.compute.amazonaws.com:8083/",
});



const validatingRefresh = () => {
    var localToken = JSON.parse(localStorage.getItem('storedData'));
    // console.log("recieved token by axios: ", typeof (localToken), localToken);
    var token = "";

    if (localToken) {
        token = localToken[0];
        const exp = decode(localToken[0]).exp;
        console.log("expire Time, currentTime: ", exp, new Date().getTime() / 1000);

        if (exp < (new Date().getTime() / 1000)) {
            let config = {
                headers: {
                    'Authorization': 'Bearer ' + localToken[1]
                }
            }
            axios.get("http://ec2-13-126-215-181.ap-south-1.compute.amazonaws.com:8083/auth/token", config)
                .then(res => {
                    // console.log("resposce after token expiry :", res, res.data.token);
                    token = res.data.token;
                    let refreshToken = localToken[1];
                    let data = [];
                    data.push(token);
                    data.push(refreshToken);
                    localStorage.removeItem('storedData');
                    localStorage.setItem('storedData', JSON.stringify(data));
                    instance.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
                })
                .catch(e => {
                    console.log("Error caught while rfreshing token :", e.response.status, e);
                    window.location.href = '/login';
                    clearInterval(myVar);
                    localStorage.removeItem('storedData');
                });
        }

        // console.log("token inside if :", token);
        instance.defaults.headers.common = { 'Authorization': `Bearer ${token}` };
    }
    else {
        // console.log("token inside else :", token);
    }
}

validatingRefresh();

//.........To set timer for refresh token
// if(localStorage.getItem('storedData')){
//     const localToken = JSON.parse(localStorage.getItem('storedData'));
//     const exp = decode(localToken[0]).exp;
//     var timeToRefresh = (exp - (new Date().getTime() / 1000));
//     console.log("timeToRefresh :", timeToRefresh);
// }

var myVar = setInterval(function () {
    validatingRefresh(); console.log("THANKYOU FOR RUNNING ME AGAIN: ");
}, 4 * 60 * 1000);                     //......4 mins.......


export default instance