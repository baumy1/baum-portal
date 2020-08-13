import userTypes from "./user.types";
const INITIAL_STATE = { 
 };

const userReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        // When a user logs out
        case(userTypes.LOG_OUT_USER):
            return INITIAL_STATE

        // When a user logs in
        case(userTypes.LOG_IN_USER):
            return action.payload
        
        case("USER_DATA_FROM_DB"):
            console.log({...state,
                ...action.payload})

            return {
                ...state,
                ...action.payload
            }



        // If the action is not included in this reducer
        default:
            return state
    }
}

export default userReducer;