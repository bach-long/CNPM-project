import actionTypes from "../action/actionType.js";

const initialState = {
  cart: [],
  done: false,
};

const handleCart = (state = initialState, action) => {
  const product = action.payload;
  let copyState = { ...state };
  switch (action.type) {
    case "ADDITEM":
      const exist = copyState.cart.find((x) => x.goodId === product.goodId);
      if (exist) {
        copyState.cart = copyState.cart.map((x) =>
          x.goodId === product.goodId ? { ...x, qty: x.qty + 1 } : x
        );
        return copyState;
      } else {
        const product = action.payload;
        copyState.cart = [
          ...copyState.cart,
          {
            ...product,
            qty: 1,
          },
        ];
        return copyState;
      }

    case "DELITEM":
      const exist1 = copyState.cart.find((x) => x.goodId === product.goodId);
      if (exist1.qty === 1) {
        copyState.cart = copyState.cart.filter(
          (x) => x.goodId !== exist1.goodId
        );
        return copyState;
      } else {
        copyState.cart = copyState.cart.map((x) =>
          x.goodId === product.goodId ? { ...x, qty: x.qty - 1 } : x
        );
        return copyState;
      }

    case "DELZERO":
      const exist2 = copyState.cart.find((x) => x.goodId === product.goodId);
      copyState.cart = copyState.cart.filter((x) => x.goodId != exist2.goodId);

      return copyState;

    case actionTypes.BUY_PRODUCTS_SUCCESS:
      copyState.done = true;
      return copyState;

    case actionTypes.BUY_PRODUCTS_FAILED:
      copyState.done = false;
      return copyState;

    default:
      return state;
  }
};

export default handleCart;
