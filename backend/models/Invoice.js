const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    // This ID is important to identify which user created this invoice
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

    // Header Section
    headerData: {
        logo: String,
        companyName: String,
        address: String,
        cityState: String,
        country: String
    },

    // Bill To Section
    billTo: {
        clientName: String,
        companyName: String,
        email: String,
        address: String,
        cityState: String,
        country: String
    },

    // Invoice Meta
    invoiceMeta: {
        invoiceNumber: { type: String, unique: true }, // Auto-generate and keep it unique
        invoiceDate: Date,
        dueDate: Date
    },

    // invoice items (stored as an array)
    invoiceItems: [{
        name: String,
        desc: String,
        qty: Number,
        rate: Number
    }],

    // Payment Info
    paymentInfo: {
        accountNumber: String,
        accountName: String,
        ifscCode: String,
        qrCodeImage: String
    },

    // Additional Info & Customization
    notesSettings: {
        notes: String,
        terms: String
    },
    template: String,
    subTotal: Number,

    // Received Amount
    // This is where the amount paid by the client is stored for each invoice
    receivedAmount: { type: Number, default: 0 },

    createdAt: { type: Date, default: Date.now }
});

// automatic invoice no logic
invoiceSchema.pre('save', async function () {
    const doc = this;

    // This runs only if the invoice number does not already exist
    if (!doc.invoiceMeta.invoiceNumber) {
        try {
            // Get the total invoice count from the database
            const count = await mongoose.model('Invoice').countDocuments();

            // Pattern: INV-001, INV-002... 
            const nextNumber = count + 1;

            // 3-digit number after 'INV-' (e.g., INV-001)
            doc.invoiceMeta.invoiceNumber = `INV-${String(nextNumber).padStart(3, '0')}`;
        } catch (error) {
            throw error;
        }
    }
});

module.exports = mongoose.model('Invoice', invoiceSchema);