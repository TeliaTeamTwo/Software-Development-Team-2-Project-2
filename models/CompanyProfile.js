const mongoose = require('mongoose');

const CompanyProfileSchema = new mongoose.Schema({
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
  likedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  superLikedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  dislikedUsers: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  likedBy: {
    type: [mongoose.Schema.Types.ObjectId],
  },
  openPositions: [
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
      minExperience: {
        type: Number,
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

module.exports = CompanyProfile = mongoose.model('companyProfile', CompanyProfileSchema);
