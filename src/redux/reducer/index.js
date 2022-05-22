import handleCart from "./handleCart";
import Login from "./login";

import {combineReducers} from "redux";


const rootReducers = combineReducers({
    handleCart ,Login
})

export default rootReducers;