import LoginFormTypes from "./login.types";

export const updateLoginEmail = (email) => ({
    type: LoginFormTypes.UPDATE_LOGIN_EMAIL,
    payload: email
})

export const updateLoginPassword = (password) => ({
    type: LoginFormTypes.UPDATE_LOGIN_PASSWORD,
    payload: password
})

export const toggleLoginPage = () => ({
    type: LoginFormTypes.TOGGLE_LOGIN_FORM
})

export const updateError = (errorCode) => ({
    type: LoginFormTypes.UPDATE_ERROR,
    payload: errorCode
})