import { LOGIN_USER, LOGOUT_USER } from "./constants";

export const loginUser = (userId) => ({
    type: LOGIN_USER,
    payload: userId,
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
});