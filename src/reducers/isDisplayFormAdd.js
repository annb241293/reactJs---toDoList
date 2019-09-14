import * as types from '../constants/actionTypes';
var initialState = false;
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.toggleForm:
            return !state;
        case types.closeForm:
            return false;
        case types.openForm:
            return true;
        default:
            return state;
    }
}
export default myReducer;