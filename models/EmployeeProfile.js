const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
    required: true,
  },
  typeOfWork: {
    type: String,
  },
  image: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  qualification: [
    {
      schoolName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      description: {
        type: String,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
  experience: [
    {
      companyName: {
        type: String,
        required: true,
      },
      title: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      description: {
        type: String,
      },
      duration: {
        type: Number,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('employee', EmployeeSchema);