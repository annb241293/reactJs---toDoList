import * as types from '../constants/actionTypes';
var initialState = false;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.editTask:
            return true;
        case types.closeForm:
            return false;
        default:
            return state;
    }
}
export default myReducer;