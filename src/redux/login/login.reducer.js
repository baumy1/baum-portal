import LoginFormTypes from "./login.types";
const INITIAL_STATE = { display: "login", error: "" };

const loginFormReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // When the email field is updated
        case LoginFormTypes.UPDATE_LOGIN_EMAIL:
            return {...state, email: action.payload}
        
        // When the password field is updated
        case LoginFormTypes.UPDATE_LOGIN_PASSWORD:
            return {...state, password: action.payload}

        // When the Login and Forgot password forms are toggled
        case LoginFormTypes.TOGGLE_LOGIN_FORM:
            // If the page is dispalying "login", change it to "forgot" and vice-versa
            if (state.display === "login") {
                return {...state, display: "forgot"}
            } else {
                return {...state, display: "login"}
            }

        // Update the login error message
        case LoginFormTypes.UPDATE_ERROR:
            return {...state, error: action.payload}

        default:
            return state
    }
}

export default loginFormReducer;