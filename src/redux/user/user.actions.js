import userTypes from "./user.types";

export const logOutUser = () => ({
    type: userTypes.LOG_OUT_USER
})

export const logInUser = (user) => ({
    type: userTypes.LOG_IN_USER,
    payload: user
})