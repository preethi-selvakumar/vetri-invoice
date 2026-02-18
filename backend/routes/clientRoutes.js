const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const auth = require('../middleware/authMiddleware');

// Fetch only the user's clients
router.get('/all', auth, clientController.getUserClients);

// update payment
router.put('/payment/:id', auth, clientController.updateClientPayment);

// Delete a client
router.delete('/:id', auth, clientController.deleteClient);

module.exports = router;
