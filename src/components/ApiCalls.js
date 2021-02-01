




const ApiCalls = {

    listUsers : "/users/dir",
    usersProfile : "/users",

    attendanceUsers : "attendance/users",
    saveAttendance : "attendance",
    attendanceHistoryGraph : "/attendance/history/graph",
    attendanceHistory : "attendance/history",

    leaveRequests : "/leave-requests",           //......POST--> To Apply leave request......and......GET--> to get applied leaves..........
    leaveRequestsHistory : "/leave-requests/history",
    leaveRequestsGraph : "/leave-requests/graph",
    leaveRequestsHistoryGraph : "/leave-requests/history/graph",

    updateAppliedRequests : "/leave-requests/{leaveRequestId}",
    ApproveRecievedLeaves : "/leave-requests/{leaveRequestId}/status/{status}{&reason(only if status is R which is Rejected)}",
    
    login : "/auth/login",
    refreshToken : "auth/token"             //.......Takes refresh Token.........
};

export default ApiCalls