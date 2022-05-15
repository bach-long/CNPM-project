// for add item to cart
export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const setCountZero = (product) => {
  return {
    type: "DELZERO",
    payload: product,
  };
};

export const user = (infoUser) => {
  return {
    type: "LOGIN",
    payload: infoUser,
  };
};

export const regist = (infoUser) => {
  return {
    type: "REGIST",
    payload: infoUser,
  };
};

