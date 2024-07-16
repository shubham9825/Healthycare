import constants from "../constants";

const initialState = {
    loggedUser: {},
};

const authentication = (state = initialState, action) => {
    switch (action.type) {
        case constants.LOGIN_SUCCESS:
            return {
                ...state,
                loggedUser: action.payload
            };
        default:
            return state;
    }
};
export default authentication;