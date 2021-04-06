import React from 'react';
import { useSelector } from 'react-redux';

const Employees = () => {
    const employees = useSelector((state) => state.employees);

    console.log(employees)
    return (
        <div>
            Employees will be shown here
        </div>
    );
};

export default Employees;