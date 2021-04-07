const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const CompoanyProfile = require('../../models/CompanyProfile');
const User = require('../../models/User');

// @route    GET api/companyprofile/me
// @desc     Get current company profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const companyProfile = await CompoanyProfile.findOne({
      user: req.user.id,
    }).populate('user', 'name');

    if (!companyProfile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(companyProfile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/companyprofile
// @desc     Create or update company profile
// @access   Private

router.post(
  '/',
  [
    auth,
    [
      check('location', 'Location is required')
        .not()
        .isEmpty(),
      check('logo', 'Logo is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { logo, about, location, website } = req.body;

    // Build profile object
    const profileFields = {};
     profileFields.user = req.user.id;
     if (logo) profileFields.logo = logo;
     if (about) profileFields.about = about
     if (location) profileFields.location = location;
     if (website) profileFields.website = website;

     try {
       let companyprofile = await CompanyProfile.findOne({ user: req.user.id });

       if (companyprofile) {
         // Update
         companyprofile = await CompanyProfile.findOneAndUpdate(
           { user: req.user.id },
           { $set: profileFields },
           { new: true }
         );

         return res.json(companyprofile);
       }

       // Create
       companyprofile = new CompanyProfile(profileFields);

       await companyprofile.save();
       res.json(companyprofile);
     } catch (err) {
       console.error(err.message);
       res.status(500).send('Server Error');
     }
  }
)

// @route    GET api/companyprofile
// @desc     Get all company profiles
// @access   Public
router.get('/', async (req, res) => {
  try {
    const profiles = await CompanyProfile.find().populate('user', 'name');
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/profile/user/:user_id
// @desc     Get profile by user ID
// @access   Public
router.get('/user/:user_id', async (req, res) => {
  try {
    const companyprofile = await CompanyProfile.findOne({
      user: req.params.user_id
    }).populate('user', 'name');

    if (!companyprofile)
      return res.status(400).json({ msg: 'Profile not found' });

    res.json(companyprofile);
  } catch (err) {
    console.error(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found' });
    }
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/company profile
// @desc     Delete company profile, user 
// @access   Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile
    await CompoanyProfile.findOneAndRemove({ user: req.user.id });
    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/companyprofile/openpositions
// @desc     Add new open position
// @access   Private
router.put(
  '/openpositions',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('skills', 'Skills are required').not().isEmpty(),
      check('contractType', 'Contract Type is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      location,
      description,
      skills,
      contractType,
      minExperience,
    } = req.body;

    const newPosition = {
      title,
      location,
      description,
      minExperience,
      skills: skills.split(',').map(skill => skill.trim()),
      contractType
    };

    try {
      const companyprofile = await CompanyProfile.findOne({ user: req.user.id });

      companyprofile.openPositions.unshift(newPosition);

      await companyprofile.save();

      res.json(companyprofile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/companyprofile/openpositions/:position_id
// @desc     Delete position from profile
// @access   Private
router.delete('/openpositions/:position_id', auth, async (req, res) => {
  try {
    const companyprofile = await CompanyProfile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = companyprofile.openPositions
      .map((item) => item.id)
      .indexOf(req.params.position_id);

    companyprofile.openPositions.splice(removeIndex, 1);

    await companyprofile.save();

    res.json(companyprofile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;