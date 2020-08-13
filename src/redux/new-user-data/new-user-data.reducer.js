import newUserDataTypes from "./new-user-data.types";

const INITIAL_STATE = { 
 };

 const newUserDataReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case(newUserDataTypes.UPDATE_FIRST_NAME):
            return {...state, firstName: action.payload}

        case(newUserDataTypes.UPDATE_LAST_NAME):
            return {...state, lastName: action.payload}

        case(newUserDataTypes.UPDATE_COUNTRY):
            return {...state, country: action.payload}

        case(newUserDataTypes.UPDATE_PHONE):
            return {...state, phone: action.payload}

        case(newUserDataTypes.UPDATE_CONTACT_EMAIL):
            return {...state, contactEmail: action.payload}
        
        // If the action is not included in this reducer
        default:
            return state
    }
 }

 export default newUserDataReducer;