export default (employees = [], action) => {
    switch (action.type) {
        case 'FETCH_ALL':
            return employees;
        case 'CREATE':
            return employees;
        default:
            return employees
    }
}