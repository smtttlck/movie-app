const express = require('express');
const asyncHandler = require('express-async-handler');
const { 
    getActors,
    getActor,
    createActor,
    deleteActor,
    updateActor
} = require('../controllers/actorController');

const router = express.Router();

const multer = require('multer');
const fs = require('fs');
const path = require('path');
const validateTokenHandler = require('../middleware/validateTokenHandler');

const storage = multer.diskStorage({ // multer disk storage
    destination: (req, res, cb) => { // path for file
        const uploadPath = 'public/uploads/actorImg';
        fs.mkdirSync(uploadPath, { recursive: true });
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => { // file name
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fieldSize: 1024 * 1024 * 5 }, // Max file size (5MB)
    fileFilter: (req, file, cb) => { // check file type
        (file.mimetype.startsWith('image/')) ? cb(null, true) : cb(new Error('Only image files are accepted.'));
    }
});

// public endpoints
router.route("/")
    .get(asyncHandler(getActors));
router.route("/:id")
    .get(asyncHandler(getActor));

router.use(asyncHandler(validateTokenHandler)); // token validation

// private endpoints
router.route("/")
    .post(upload.single("image"), asyncHandler(createActor));
router.route("/:id")
    .delete(asyncHandler(deleteActor))
    .put(upload.single("image"), asyncHandler(updateActor));

module.exports = router;