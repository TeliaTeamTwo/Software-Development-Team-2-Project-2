const Employee = require('../models/Employee');

// logic of routes is in here. This helps to make routes more clear

// /employees

const getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        console.log(employees);

        res.status(200).json(employees);

    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const createEmployee = async (req,res) => {
    const employee = req.body;

    const newEmployee = new Employee(employee);

    try {
        await newEmployee.save();
        
        res.status(201).json(newEmployee);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

module.exports = {getEmployees, createEmployee};