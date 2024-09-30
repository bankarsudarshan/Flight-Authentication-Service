const express = require('express');
const router = express.Router();
const UserController = require('../../controllers/user-controller');
const { validateAuthRequest, validateIsAdminRequest }= require('../../middlewares/auth-request-validators');

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
router.get(
            '/isAuthenticated',
            UserController.isAuthenticated,
)

router.post(
            '/addRole',
            UserController.addRole,
)

router.get(
            '/isAdmin',
            validateIsAdminRequest,
            UserController.isAdmin,
)

module.exports = router;