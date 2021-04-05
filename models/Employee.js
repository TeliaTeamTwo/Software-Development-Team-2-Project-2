const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: {
       type: String,
       required: true, 
    },
    about: {
        type: String,
        required: true,
    },
    skills: {
        type: String,
        required: true,
    },
    typeOfWork: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    location: {
        type: String,
        required: false,
    },
    qualification: {
        type: String,
        required: false,
    },
    experience: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('employee', EmployeeSchema);

