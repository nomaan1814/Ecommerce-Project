import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cartConstant";
export const cartReducer = (state = { cartItem: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const existItem = state.cartItem.find((x) => x.product === item.product);
      if (existItem) {
        return {
          ...state,
          cartItem: state.cartItem.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state, //Spread operator
          cartItem: [...state.cartItem, item],
        };
      }
    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItem: state.cartItem.filter((x) => {
          return x.product !== action.payload;
        }),
      };
    default:
      return state;
  }
};
