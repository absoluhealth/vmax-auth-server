const express = require("express");
const router = express.Router();
const UserController = require("../controllers/user.controller");

router
  .get("/", UserController.getUsers)
  .get("/:id", UserController.getUser)
  .post("/", UserController.createUser)
  .put("/", UserController.updateUser)
  .delete("/", UserController.deleteUser)
  .put("/:id/change-password", UserController.changePassword)
  .put("/:id/resetpassword", UserController.resetPassword);

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: Full name of the user.
 *           example: "John Doe"
 *         email:
 *           type: string
 *           description: Email id of the user.
 *           example: "john.doe@gmail.com"
 *         tenantId:
 *           type: string
 *           description: Id of the tenant in which user is to be created
 *           example: 'vmax'
 *     ChangePassword:
 *       type: object
 *       properties:
 *         password:
 *           type: string
 *           description: New password.
 *           example: "Passfg2344"
 *         tenantId:
 *           type: string
 *           description: Id of the tenant in which user password to be changed.
 *           example: 'vmax'
 *     ResetPassword:
 *       type: object
 *       properties:
 *         tenantId:
 *           type: string
 *           description: Id of the tenant in which user password to be resetted.
 *           example: 'vmax'
 */

// Handle the /users endpoint
/**
 * @swagger
 * /api/users?tenant-id :
 *   get:
 *     summary: Get users list.
 *     description: Get all the users in a tenant.
 *     parameters:
 *       - in: query
 *         name: tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tenant ID from which the users list to be retrieved.
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *     responses:
 *       '200':
 *         description: A successful response with array of users
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/:id?tenant-id :
 *   get:
 *     summary: Get user .
 *     description: Get User.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID of the user
 *       - in: query
 *         name: tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Tenant ID from which the users list to be retrieved.
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Create a new user.
 *     description: Create User in the system.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *       - in: body
 *         name: user
 *         description: User to be updated in the system. If password field is not empty then the password will be updated.
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/users/:id:
 *   put:
 *     summary: Updtes the user.
 *     description: Updates the user information in the system.
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *       - in: body
 *         name: user
 *         description: User to be updated in the system. If password field is not empty then the password will be updated.
 *         schema:
 *           $ref: '#/components/schemas/User'
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/:id:
 *   delete:
 *     summary: Deletes the user in a tenant.
 *     description: Delets the user information in the system for a given tenant..
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/:id/change-password:
 *   put:
 *     summary: Updates the user password.
 *     description: Updates in the user password in the given tenant
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *       - in: body
 *         name: ChangePassword
 *         description: Password model.
 *         schema:
 *           $ref: '#/components/schemas/ChangePassword'
 *
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */
/**
 * @swagger
 * /api/users/:id/reset-password:
 *   put:
 *     summary: Sends the reset password link.
 *     description: Sends the reset password link
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *       - in: header
 *         name: x-tenant-id
 *         schema:
 *           type: string
 *         required: true
 *         description: Requesting user's tenant id
 *       - in: body
 *         name: ResetPassword
 *         description: Password model.
 *         schema:
 *           $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       '200':
 *         description: A successful response with user info
 *       '404':
 *         description: Tenant not found
 *       '500':
 *         description: Internal server error
 *       '401':
 *         description: Unauthorized
 */

// Add more routes for the /users endpoint as needed

module.exports = router;
