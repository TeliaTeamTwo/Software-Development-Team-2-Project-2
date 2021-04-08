import * as api from '../api/index.js';
import { FETCH_ALL, CREATE } from '../constants/actionTypes';

// Action creators (functions which return an action)
export const getEmployees = () => async (dispatch) => {
    try {
        const { data } = await api.fetchEmployees();

        dispatch({ type: FETCH_ALL, payload: data });
    } catch (error) {
        console.log(error.message);
    }
}

export const createEmployee = (employee) => async (dispatch) => {
    try {
        const { data } = await api.createEmployee(employee);

        dispatch({ type: CREATE, payload: data })
    } catch (error) {
        console.log(error.message);
    }
}