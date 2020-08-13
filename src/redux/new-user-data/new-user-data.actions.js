import newUserDataTypes from "./new-user-data.types";

export const updateFirstName = (payload) => ({
    type: newUserDataTypes.UPDATE_FIRST_NAME,
    payload: payload
})

export const updateLastName = (payload) => ({
    type: newUserDataTypes.UPDATE_LAST_NAME,
    payload: payload
})

export const updateContactEmail = (payload) => ({
    type: newUserDataTypes.UPDATE_CONTACT_EMAIL,
    payload: payload
})

export const updateCountry = (payload) => ({
    type: newUserDataTypes.UPDATE_COUNTRY,
    payload: payload
})

export const updatePhone = (payload) => ({
    type: newUserDataTypes.UPDATE_PHONE,
    payload: payload
})