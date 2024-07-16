import * as actions from "../actions";

export const loginInSuccessAction = (payload) => {
    return async (dispatch) => {
        dispatch(actions.LogInSuccess(payload))
    };
};