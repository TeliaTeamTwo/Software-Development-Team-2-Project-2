const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const EmployeeProfile = require('../../models/EmployeeProfile');
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
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills are required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { about, skills, typeOfWork, image, location } = req.body;

    // Build profile object
    const profileFields = {};
     profileFields.user = req.user.id;
     if (about) profileFields.about = about;
     if (skills)
       profileFields.skills = skills.split(',').map((skill) => skill.trim());
     if (typeOfWork) profileFields.typeOfWork = typeOfWork;
     if (image) profileFields.image = image;
     if (location) profileFields.location = location;

     try {
       let employeeprofile = await EmployeeProfile.findOne({ user: req.user.id });

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
)

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
      check('schoolName', 'School name is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
      check('duration', 'Duration is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      schoolName,
      title,
      location,
      description,
      duration
    } = req.body;

    const newQualification = {
      schoolName,
      title,
      location,
      description,
      duration
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
      check('companyName', 'Company name is required').not().isEmpty(),
      check('title', 'Title is required').not().isEmpty(),
      check('duration', 'Duration is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      companyName,
      title,
      location,
      description,
      duration
    } = req.body;

    const newExperience = {
      companyName,
      title,
      location,
      description,
      duration
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