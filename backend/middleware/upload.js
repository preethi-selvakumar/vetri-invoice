const multer = require('multer');
const path = require('path');

// Storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Files will be stored in the 'uploads' folder
    },
    filename: (req, file, cb) => {
        // Assign a unique name
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

// File filter: Allow images and PDF files
const fileFilter = (req, file, cb) => {
    // The PDF format has also been added to the regex
    const allowedTypes = /jpeg|jpg|png|pdf/;

    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        // The error message has also been added to the PDF
        cb(new Error('Only images (JPG, PNG) and PDF files are allowed!'));
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // Set the maximum size to 5MB (for PDF safety)
    fileFilter: fileFilter
});

module.exports = upload;