const AuthController = require("../controllers/auth.controller");

const express = require("express");
const router = express.Router();
const UserController = require("../controllers/auth.controller");
const TenantController = require("../controllers/tenant.controller");

router.route("/login").get(AuthController.login).post(AuthController.doLogin);
router
  .route("/forgot-password")
  .get(AuthController.forgotPassword)
  .post(AuthController.doForgotPassword);

router
  .route("/reset-password")
  .get(AuthController.resetPassword)
  .post(AuthController.doResetPassword);
router.route("/tenant").get(TenantController.getTenants);

router.route("/get-token").get(AuthController.getToken);

router.route("/logout").get(AuthController.logout);

// Add more routes for the /users endpoint as needed

module.exports = router;
