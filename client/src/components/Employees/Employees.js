import React from 'react';
import { useSelector } from 'react-redux';

const Employees = () => {
    const employees = useSelector((state) => state.employees);

    console.log(employees)

    return (
        <div>
            <h2>Employees will be shown here</h2>
            {employees.map((employee) => (
                <div key={employee._id}>Employee
                    <div>{employee.name}</div>
                    <div>{employee.about}</div>
                    <div>{employee.skills}</div>
                    <div>{employee.typeOfWork}</div>
                    <div>{employee.location}</div>
                    <div>{employee.qualification}</div>
                    <div>{employee.experience}</div>
                    <img src={employee.image}></img>
                </div>
                
            ))}
        </div>
    );
};

export default Employees;