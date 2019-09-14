import { combineReducers } from "redux";
import getTask from './task';
import toggleForm from './isDisplayFormAdd';
import taskEdit from './taskEdit';
import isEdit from './isEdit';
const myReducer = combineReducers({
    task: getTask,
    isDisplayFormAdd: toggleForm,
    isEdit,
    taskEdit

});
export default myReducer;