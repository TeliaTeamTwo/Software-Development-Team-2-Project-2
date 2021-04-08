import { FETCH_ALL, CREATE } from '../constants/actionTypes';

export default (employees = [], action) => {
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
        case CREATE:
            return [ ...employees, action.payload];
        default:
            return employees
    }
}