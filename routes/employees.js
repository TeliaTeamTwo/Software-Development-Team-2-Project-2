const express = require('express');

const {getEmployees, createEmployee} = require('../controllers/employees');

const router = express.Router();

// localhost:5000/employees
router.get('/', getEmployees);
router.post('/', createEmployee);

module.exports = router;