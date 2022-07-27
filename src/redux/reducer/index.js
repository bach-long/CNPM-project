import handleCart from "./handleCart";
import Login from "./login";
import Product from "./product";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  handleCart,
  Login,
  Product,
});

export default rootReducers;
