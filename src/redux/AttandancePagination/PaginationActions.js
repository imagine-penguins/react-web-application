





import {Right_Pagination} from "./PaginationType";
import axios from "../../components/axios";
import ApiCalls from "../../components/ApiCalls";



export const paginationRight = (data) => {
    return{
        type: Right_Pagination,
        payload: data
    };
}


export const fetchPaginationRightData = () => {
    return (dispatch) => {
        axios.get(ApiCalls.attendanceUsers + `?size=3`)
        .then(res => {
            console.log("res inside redux: ", res)
            const data = res.data
            dispatch(paginationRight(data))
        })
        .catch(err => {
            console.log("error caught in the fetchPaginationData in PaginationActions.js : ", err)
        })
    }
}
