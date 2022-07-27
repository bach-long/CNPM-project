import actionTypes from "./actionType";
import { toast } from "react-toastify";

export const delCart = (product) => {
  return {
    type: "DELITEM",
    payload: product,
  };
};

export const addCart = (product) => {
  return {
    type: "ADDITEM",
    payload: product,
  };
};

export const setCountZero = (product) => {
  return {
    type: "DELZERO",
    payload: product,
  };
};

export const fetchBuyProductCart = (listGoodsBuys, items) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      let status;

      var requestOptions = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ goodBuys: listGoodsBuys }),
        redirect: "follow",
      };

      fetch("http://127.0.0.1:5000/api/goods/goodBuys", requestOptions)
        .then((response) => {
          status = response.status;
          return response.text();
        })
        .then(function (res) {
          if (res && status === 200) {
            listGoodsBuys.map((good) => {
              var product;
              for (var i of items) {
                if (i.goodId === good.goodId) {
                  product = i;
                  break;
                }
              }
              dispatch(setCountZero(product));
            });

            dispatch({ type: actionTypes.BUY_PRODUCTS_SUCCESS });

            toast.info("Mua hàng thành công!", {
              position: "top-center",
              autoClose: 3000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          } else {
            toast.error("Mua hàng thất bại :(");
            dispatch({ type: actionTypes.BUY_PRODUCTS_FAILED });
          }
        });
    } catch (err) {
      console.error("LOGOUT ERR", err);
      toast.error("Mua hàng thất bại :(");

      dispatch({ type: actionTypes.BUY_PRODUCTS_FAILED });
    }
  };
};

export const setStatusDone = () => {
  return {
    type: actionTypes.BUY_PRODUCTS_FAILED,
  };
};
