





import { combineReducers } from "redux";
import paginationReducer from "./AttandancePagination/PaginationReducer";

const rootReducer = combineReducers({
    paginationRight: paginationReducer
})


export default rootReducer