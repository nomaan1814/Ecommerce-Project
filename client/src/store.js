import { createStore, combineReducers, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import { cartReducer } from "./reducers/cartReducer";
import { userDetailReducer, userLoginReducer,userRegisterReducer, userUpdateProfileReducer } from "./reducers/userReducer";
const userInfofromStorage=localStorage.getItem('userInfo')
?JSON.parse(localStorage.getItem('userInfo')):null;
const cartItemfromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReducer,
  userLogin:userLoginReducer,
  userRegister:userRegisterReducer,
  userDetails:userDetailReducer,
  userUpdateProfile:userUpdateProfileReducer
});
const init_state = {
  // cart: { cartItem: "techinfo" },
  cart: { cartItem: cartItemfromStorage },
  userLogin:{userInfo:userInfofromStorage}
};
const middleware = [thunk]; //middleware is not single we can use multiple middleware that's why we take array here
const store = createStore(
  reducer,
  init_state,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
