const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');
const auth = require('../middleware/authMiddleware'); // Security guard
const upload = require('../middleware/upload'); // Image upload middleware

// Fetch the next available invoice number
router.get('/next-number', auth, invoiceController.getNextInvoiceNumber);

// Save invoice & auto-create client
router.post(
    '/create',
    auth,
    upload.fields([
        { name: 'logo', maxCount: 1 },
        { name: 'qrCodeImage', maxCount: 1 }
    ]),
    invoiceController.createInvoice
);

// Fetch all invoices for a specific user
router.get('/all', auth, invoiceController.getUserInvoices);

// Send invoice via email
// Here, single('pdf') is used — this is the file name coming from the front end
router.post('/send-mail', auth, upload.single('pdf'), invoiceController.sendInvoiceMail);

// Fetch a specific invoice by ID
router.get('/:id', auth, invoiceController.getInvoiceById);

module.exports = router;
