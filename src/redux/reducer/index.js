import {combineReducers} from 'redux'

import profile from "./profile";
import itemList from "./itemList";
import itemDetail from "./itemDetail";
import cart from "./cart";
import restaurants from "./restaurants";
import review from "./review";


const appReducer = combineReducers({
   profile,itemDetail,itemList, cart , restaurants, review
} )

export default appReducer;