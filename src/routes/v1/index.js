const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const { validateAuthRequest }= require('../../middlewares/auth-request-validators');

router.post(
            '/signup',
            validateAuthRequest,
            UserController.signUp,
);
router.post(
            '/signin',
            validateAuthRequest,        
            UserController.signIn,
);

module.exports = router;