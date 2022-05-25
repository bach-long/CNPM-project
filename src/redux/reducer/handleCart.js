const cart = [];


const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
        //Check product
      const exist = state.find((x) => x.goodId === product.goodId);
      if (exist) {
        //increase the quantity
        return state.map((x) => 
          x.goodId === product.goodId ? {...x, qty: (x.qty + 1)} : x
        );
      } else {
        const product = action.payload;
        return [ 
          ...state,
          {
            ...product,
            qty: 1,
          }
        ];
      }

    case "DELITEM":
      const exist1 = state.find((x) => x.goodId === product.goodId);
      if (exist1.qty === 1) {
        return state.filter((x) => x.goodId !== exist1.goodId);
      } else {
        return state.map((x) =>
          x.goodId === product.goodId ? { ...x, qty: x.qty - 1 } : x
        );
      }

    case "DELZERO":
      const exist2 = state.find((x) => x.goodId === product.goodId);
      return state.filter(x=> x.goodId != exist2.goodId);

      
    default:
      return state;
  }
}

export default handleCart;
