const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  logo: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
  },
  openPosition: [
    {
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
      skills: {
        type: [String],
        required: true,
      },
      contractType: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
