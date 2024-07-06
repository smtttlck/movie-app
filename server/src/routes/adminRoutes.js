const express = require('express');
const asyncHandler = require('express-async-handler');
const { 
    getAdmins,
    createAdmin,
    deleteAdmin,
    updateAdmin,
    adminLogin
} = require('../controllers/adminController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

const router = express.Router();

// public endpoints
router.route("/login")
    .post(asyncHandler(adminLogin));

router.use(asyncHandler(validateTokenHandler)); // token validation

// private endpoints
router.route("/")
    .get(asyncHandler(getAdmins))
    .post(asyncHandler(createAdmin));
router.route("/:id")
    .delete(asyncHandler(deleteAdmin))
    .put(asyncHandler(updateAdmin));

module.exports = router;