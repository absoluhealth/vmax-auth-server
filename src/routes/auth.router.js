const AuthController = require('../controllers/auth.controller');

const express = require('express');
const router = express.Router();
const UserController = require('../controllers/auth.controller');


router
.route('/login')
.get(AuthController.login)
.post(AuthController.doLogin)


router
.route('/get-token')
.get(AuthController.getToken)

router.route('/logout').get(AuthController.logout)

// Add more routes for the /users endpoint as needed

module.exports = router;