import * as types from '../constants/actionTypes';

export const getTask = () => {
    return {
        type: types.getTask
    }
}
export const getEditTask = (task) =>{
    return {
        type: types.getEditTask,
        task
    }
}
export const toggleForm = () => {
    return {
        type: types.toggleForm
    }
}
export const closeForm = () => {
    return {
        type: types.closeForm
    }
}
export const openForm = () => {
    return {
        type: types.openForm
    }
}
export const addTask = (task) => {
    return {
        type: types.addTask,
        task
    }
}
export const editTask = (id,task) => {
    return {
        type: types.editTask,
        task:{
            id,
            name:task.name,
            status: task.status
        }
    }
}
export const delTask = (id) => {
    return {
        type: types.delTask,
        id
    }
}