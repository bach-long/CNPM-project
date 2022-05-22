const user = {};

const Login = (state = user, action) => {
    const inforUser = action.payload;
    switch(action.type) {
        case "LOGIN":
            return inforUser;
        case "TOKEN":
            var status;
            var ojData = {
                method: 'GET',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " +inforUser,
                }
            }
            fetch("http://127.0.0.1:5000/api/auth/me", ojData)
                .then(function(response) {
                    status = response.status;
                    return response.json();
                })
                .then(function(res) {
                  if (status === 200) {
                    state = res;
                    console.log(state)
                  } else {
                      state = null;
                  }
                })

            console.log(state)
            return user;
        default:
            return state;
    } 
}

export default Login;