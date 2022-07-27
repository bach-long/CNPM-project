import actionTypes from "../action/actionType.js";

const user = {};
const Login = (state = user, action) => {
  let inforUser = {};
  switch (action.type) {
    case "LOGIN":
      inforUser = action.payload;
      return inforUser;

    case actionTypes.LOGIN_BY_JWT_SUCCESS:
      inforUser = action.payload;
      return inforUser;

    case actionTypes.LOGIN_BY_JWT_FAILED:
      inforUser = {};
      return inforUser;

    case actionTypes.LOGIN_SUCCESS:
      inforUser = action.payload;
      return inforUser;

    case actionTypes.LOGIN_FAILED:
      inforUser = action.data;
      return inforUser;

    case actionTypes.LOGOUT_SUCCESS:
      inforUser = {};
      return inforUser;

    case actionTypes.LOGOUT_FAILED:
      return state;

    default:
      return state;
  }
};

export default Login;
