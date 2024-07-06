const express = require('express');
const asyncHandler = require('express-async-handler');
const { 
    getCategories,
    createCategory,
    deleteCategory,
    updateCategory
} = require('../controllers/categoryController');
const validateTokenHandler = require('../middleware/validateTokenHandler');

const router = express.Router();

// public endpoints
router.route("/")
    .get(asyncHandler(getCategories));

router.use(asyncHandler(validateTokenHandler)); // token validation

// private endpoints
router.route("/")
    .post(asyncHandler(createCategory));
router.route("/:id")
    .delete(asyncHandler(deleteCategory))
    .put(asyncHandler(updateCategory));

module.exports = router;