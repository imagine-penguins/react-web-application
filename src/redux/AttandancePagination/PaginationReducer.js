




import {Right_Pagination} from "./PaginationType";


const initialState = {
    paginationData: []
}


const paginationReducer = (state=initialState, action) => {
    switch(action.type){
        case Right_Pagination : return{
            ...state,
            paginationData: action.payload
        }
        default : return state
    }
}

export default paginationReducer
