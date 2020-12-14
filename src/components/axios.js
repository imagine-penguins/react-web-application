




import axios from 'axios';


// const token = "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYW5pc2hhIiwianRpIjoiMTciLCJzY29wZXMiOlsidmlldy1zZWxmLWF0dGVuZGFuY2UtaGlzdG9yeSIsIm1hcmstZW1wbG95ZWUtYXR0ZW5kYW5jZSIsIm1hcmstc3R1ZGVudC1hdHRlbmRhbmNlIiwiZWRpdC1zdHVkZW50LWF0dGVuZGFuY2UtaGlzdG9yeSIsImVkaXQtZW1wbG95ZWUtYXR0ZW5kYW5jZS1oaXN0b3J5IiwiYXBwbHktbGVhdmUtcmVxdWVzdCIsInVwZGF0ZS1sZWF2ZS1yZXF1ZXN0Iiwidmlldy1zZWxmLWF0dGVuZGFuY2UtaGlzdG9yeSIsInZpZXctc2VsZi1hdHRlbmRhbmNlLWhpc3RvcnkiLCJtYXJrLXN0dWRlbnQtYXR0ZW5kYW5jZSIsImVkaXQtc3R1ZGVudC1hdHRlbmRhbmNlLWhpc3RvcnkiLCJhcHBseS1sZWF2ZS1yZXF1ZXN0IiwidXBkYXRlLWxlYXZlLXJlcXVlc3QiXSwidXNlcnR5cGUiOiJFIiwiaW5zdGl0dXRlIjoxLCJpbnN0aXR1dGVDbGFzc1NlY3Rpb24iOjAsImlzcyI6ImltYWdpbmVwZW5ndWlucyIsImlhdCI6MTYwNzcwMjc1NSwiZXhwIjoxNjA3NzE3MTU1fQ.SxbbJurWjmtNt4K63AZFJhoHw0_VWpQRpK6Qdn-9HoduhhkCLvsQulHGuPCYBzmasbhz3qRqTw4M12uxS0gMyA";

const instance = axios.create({
    baseURL : "http://ec2-52-66-248-229.ap-south-1.compute.amazonaws.com:8083/",
});

var localToken  = JSON.parse(localStorage.getItem('storedData'));
console.log("recieved token by axios: ", typeof(localToken), localToken);
var token;
if (localToken){
    token = localToken[0];
    console.log("token inside if :", token);
}
else{
    console.log("token inside else :", token);
}



console.log("token is :", token);
// instance.defaults.headers.common = { 'Authorization': `Bearer ${token}` };

// axios.defaults.baseURL = "http://ec2-52-66-248-229.ap-south-1.compute.amazonaws.com:8083/";
instance.defaults.headers.common = { 'Authorization': `Bearer ${token}` }


export default instance
