import actionTypes from "../action/actionType.js";

const initialState = {
  products: [],
  pageCount: 1,
  loading: false,
  productsSearch: [],
  pageCountSearch: 1,
};
const Product = (state = initialState, action) => {
  let copyState = { ...initialState };
  switch (action.type) {
    case actionTypes.GET_ALL_PRODUCT_SUCCESS:
      copyState.products = action.data.goods;
      copyState.pageCount = action.data.totalPageCount;
      copyState.loading = false;
      return copyState;
    case actionTypes.GET_ALL_PRODUCT_FAILED:
      copyState.products = [];
      copyState.loading = false;
      return copyState;
    case actionTypes.GET_ALL_PRODUCT_LOADING:
      copyState.loading = true;
      return copyState;

    case actionTypes.FETCH_SEARCH_PRODUCT_SUCCESS:
      copyState.productsSearch = action.data.goods;
      copyState.pageCountSearch = action.data.totalPageCount;
      return copyState;
    case actionTypes.FETCH_SEARCH_PRODUCT_FAILED:
      copyState.productsSearch = [];
      return copyState;
    default:
      return state;
  }
};

export default Product;
