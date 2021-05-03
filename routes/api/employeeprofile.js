const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const EmployeeProfile = require('../../models/EmployeeProfile');
const CompanyProfile = require('../../models/CompanyProfile');
const User = require('../../models/User');

// @route    GET api/employeeprofile/me
// @desc     Get current employee profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const employeeProfile = await EmployeeProfile.findOne({
      user: req.user.id,
    }).populate('user', 'name');

    if (!employeeProfile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(employeeProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/employeeprofile
// @desc     Create or update employee profile
// @access   Private

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('location', 'Location is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      status,
      about,
      skills,
      typeOfWork,
      image,
      location,
      youtube,
      website,
      linkedin,
      github,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (status) profileFields.status = status;
    if (about) profileFields.about = about;
    if (skills)
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    if (typeOfWork) profileFields.typeOfWork = typeOfWork;
    if (image) profileFields.image = image;
    if (location) profileFields.location = location;

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (website) profileFields.social.website = website;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (github) profileFields.social.github = github;

    try {
      let employeeprofile = await EmployeeProfile.findOne({
        user: req.user.id,
      });

      if (employeeprofile) {
        // Update
        employeeprofile = await EmployeeProfile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(employeeprofile);
      }

      // Create
      employeeprofile = new EmployeeProfile(profileFields);

      await employeeprofile.save();
      res.json(employeeprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/employeeprofile
// @desc     Get all employee profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await EmployeeProfile.find().populate('user', 'name');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/employeeprofile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const employeeprofile = await EmployeeProfile.findOne({
      user: req.params.user_id
    }).populate('user', 'name');

    if (!employeeprofile)
      return res.status(400).json({ msg: 'Profile not found' });

    res.json(employeeprofile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    PUT companyprofile/user/:user_id/likedby
// @desc     Like a post
// @access   Private
router.put('/user/:user_id/likedby', auth, async (req, res) => {
  try {
    const employeeprofile = await EmployeeProfile.findOne({
      user: req.params.user_id,
    });

    // Check if the company has already been liked
    if (
      employeeprofile.likedby.filter(
        (like) => like.user.toString() === req.user.id
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Employee already liked' });
    }

    employeeprofile.likedby.unshift({ user: req.user.id });

    await employeeprofile.save();

    res.json(employeeprofile.likedby);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT employeeprofile/user/:user_id/likes
// @desc     Like a post
// @access   Private
router.put('/user/:user_id/likes', auth, async (req, res) => {
  try {
    const companyprofile = await CompanyProfile.findOne({
      user: req.user.id,
    });

    // Check if the company has already been liked
    if (
      companyprofile.likes.filter(
        (like) => like.user.toString() === req.params.user_id.toString()
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Employee already liked' });
    }

    companyprofile.likes.unshift({ user: req.params.user_id });

    await companyprofile.save();

    res.json(companyprofile.likes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT employeeprofile/user/:user_id/dislikes
// @desc     Like a post
// @access   Private
router.put('/user/:user_id/dislikes', auth, async (req, res) => {
  try {
    const companyprofile = await CompanyProfile.findOne({
      user: req.user.id,
    });

    // Check if the company has already been liked
    if (
      companyprofile.dislikes.filter(
        (dislike) => dislike.user.toString() === req.params.user_id.toString()
      ).length > 0
    ) {
      return res.status(400).json({ msg: 'Employee already disliked' });
    }

    companyprofile.dislikes.unshift({ user: req.params.user_id });

    await companyprofile.save();

    res.json(companyprofile.dislikes);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


// @route    DELETE api/employeeprofile
// @desc     Delete employee profile, user 
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await EmployeeProfile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/employeeprofile/qualifications
// @desc     Add new qualification
// @access   Private
router.put(
  '/qualifications',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;

    const newQualification = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    };

    try {
      const employeeprofile = await EmployeeProfile.findOne({ user: req.user.id });

      employeeprofile.qualification.unshift(newQualification);

      await employeeprofile.save();

      res.json(employeeprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/employeeprofile/qualifications/:qualification_id
// @desc     Delete qualification from profile
// @access   Private
router.delete('/qualifications/:qualification_id', auth, async (req, res) => {
  try {
    const employeeprofile = await EmployeeProfile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = employeeprofile.qualification
      .map((item) => item.id)
      .indexOf(req.params.qualification_id);

    employeeprofile.qualification.splice(removeIndex, 1);

    await employeeprofile.save();

    res.json(employeeprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/employeeprofile/experience
// @desc     Add new experience
// @access   Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
    ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    } = req.body;

    const newExperience = {
      title,
      company,
      location,
      from,
      to,
      current,
      description
    };

    try {
      const employeeprofile = await EmployeeProfile.findOne({ user: req.user.id });

      employeeprofile.experience.unshift(newExperience);

      await employeeprofile.save();

      res.json(employeeprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/employeeprofile/experience/:experience_id
// @desc     Delete experience from profile
// @access   Private
router.delete('/experience/:experience_id', auth, async (req, res) => {
  try {
    const employeeprofile = await EmployeeProfile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = employeeprofile.experience
      .map((item) => item.id)
      .indexOf(req.params.experience_id);

    employeeprofile.experience.splice(removeIndex, 1);

    await employeeprofile.save();

    res.json(employeeprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;