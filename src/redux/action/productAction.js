import actionTypes from "./actionType";

export const fetchGetAllProducts = (page) => {
  return async (dispatch) => {
    try {
      let status;
      dispatch({ type: actionTypes.GET_ALL_PRODUCT_LOADING });
      await fetch(`http://127.0.0.1:5000/api/goods?page=${page}`)
        .then(function (response) {
          status = response.status;
          return response.json();
        })
        .then(function (res) {
          if (status === 200) {
            dispatch({
              type: actionTypes.GET_ALL_PRODUCT_SUCCESS,
              data: res,
            });
          } else {
            dispatch({
              type: actionTypes.GET_ALL_PRODUCT_FAILED,
            });
          }
        });
    } catch (err) {
      console.error("LOGOUT ERR", err);
      dispatch({ type: actionTypes.GET_ALL_PRODUCT_FAILED });
    }
  };
};

export const fetchSearchProduct = (query) => {
  return async (dispatch) => {
    try {
      var objData = {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        redirect: "follow",
      };

      fetch(`http://127.0.0.1:5000/api/goods?query=${query}}`, objData)
        .then((response) => response.json())
        .then(function (res) {
          dispatch({
            type: actionTypes.FETCH_SEARCH_PRODUCT_SUCCESS,
            data: res,
          });
        })
        .catch((error) => console.log("error", error));
    } catch (err) {
      console.error("FETCH_SEARCH_PRODUCT_FAILED ERR", err);
      dispatch({ type: actionTypes.FETCH_SEARCH_PRODUCT_FAILED });
    }
  };
};
