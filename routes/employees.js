const express = require('express');

const {getEmployees} = require('../controllers/employees');

const router = express.Router();

// localhost:5000/employees
router.get('/', getEmployees);

module.exports = router;