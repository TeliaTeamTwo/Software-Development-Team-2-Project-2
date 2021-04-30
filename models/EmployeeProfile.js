const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  status: {
    type: String,
    required: true,
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
  likedUsers: {
    type: [String],
  },
  superLikedUsers: {
    type: [String],
  },
  dislikedUsers: {
    type: [String],
  },
  likedBy: {
    type: [String],
  },
  social: {
    youtube: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    website: {
      type: String,
    },
    github: {
      type: String,
    },
  },
  qualification: [
    {
      school: {
        type: String,
        required: true,
      },
      degree: {
        type: String,
        required: true,
      },
      fieldofstudy: {
        type: String,
        required: true,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
  experience: [
    {
      title: {
        type: String,
        required: true,
      },
      company: {
        type: String,
        required: true,
      },
      location: {
        type: String,
      },
      from: {
        type: Date,
        required: true,
      },
      to: {
        type: Date,
      },
      current: {
        type: Boolean,
        default: false,
      },
      description: {
        type: String,
      },
    },
  ],
});

module.exports = mongoose.model('employeeProfile', EmployeeSchema);