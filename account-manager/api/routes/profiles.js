const express = require('express');
const router = express.Router();


const ProfilesController = require('../controllers/profiles');
const register = require('../middlewares/register');
const validate = require('../middlewares/check-auth');

router.post('/', register, ProfilesController.profiles_create_profile);
router.put('/', validate, ProfilesController.profiles_update_profile);
router.get('/', validate, ProfilesController.profiles_get_profile);

module.exports = router;