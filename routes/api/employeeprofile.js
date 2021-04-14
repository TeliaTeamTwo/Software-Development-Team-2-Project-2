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
     if (typeOfWork) profileFields.typeOfWork = typeOfWork
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

module.exports = router;