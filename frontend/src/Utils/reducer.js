import { LOGIN_USER, LOGOUT_USER } from "./constants";

const initialState = {
    userId: null,
    isLoggedIn: false,
};

const LoginReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER:
            return {
                ...state,
                userId: action.payload,
                isLoggedIn: true,
            };

        case LOGOUT_USER:
            return {
                ...state,
                userId: null,
                isLoggedIn: false,
            };

        default:
            return state;
    }
};

export default LoginReducer;
