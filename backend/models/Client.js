const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    clientName: {
        type: String,
        required: true,
        trim: true
    },
    companyName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String
    },
    cityState: {
        type: String
    },
    country: {
        type: String
    },
    // This field is important for automatic status calculation
    receivedAmount: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

ClientSchema.index({ user: 1, email: 1 }, { unique: true });

module.exports = mongoose.model('Client', ClientSchema);