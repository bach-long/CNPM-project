const user = {};

const Login = (state = user, action) => {
    const inforUser = action.payload;
    switch(action.type) {
        case "LOGIN":
            return inforUser;
        default:
            return state;
    } 
}

export default Login;