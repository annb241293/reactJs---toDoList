import * as types from '../constants/actionTypes';
var task = JSON.parse(localStorage.getItem('task'));

var s4 = () => {
    return Math.floor(Math.random() * 10).toString(16);
}
var generateID = () => {
    return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();
}
var initialState = task ? task : [];
var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.getTask:
            return [...state];
        case types.addTask:
            var newItem = {
                id: generateID(),
                name: action.task.name,
                status: action.task.status
            }
            state.push(newItem)
            localStorage.setItem('task', JSON.stringify(state))
            return [...state];
        case types.editTask:
            let task = state.map(task => {
                if (task.id === action.task.id) {
                    task = action.task;
                }
                return task;
            })
            localStorage.setItem('task', JSON.stringify(task))
            return task;
        case types.delTask:
            var delTask = state.filter(task => {
                return task.id !== action.id
            })
            localStorage.setItem('task', JSON.stringify(delTask))
            return delTask;
        default:
            return [...state];
    }
}
export default myReducer;