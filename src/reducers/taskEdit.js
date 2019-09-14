import * as types from '../constants/actionTypes';
var initialState = null;
const myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getEditTask:
        return action.task;
        case types.closeForm:
        return null;
        default:
            return state;
    }
}
export default myReducer;