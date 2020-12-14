




const ApiCalls = {
    login : "auth/login",

    attendanceUsers : "attendance/users",
    saveAttendance : "attendance",
    attendanceHistoryGraph : "/attendance/history/graph",
    attendanceHistory : "attendance/history",

    leaveRequests : "/leave-requests",
    leaveRequestsHistory : "/leave-requests/history",
    leaveRequestsGraph : "/leave-requests/graph",

    updateAppliedRequests : "/leave-requests/{leaveRequestId}",
    ApproveRecievedLeaves : "/leave-requests/{leaveRequestId}/status/{status}{&reason(only if status is R which is Rejected)}",
    
    refreshToken : "auth/token"             //.......Takes refresh Token.........
};

export default ApiCalls