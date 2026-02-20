const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const invoiceRoutes = require('./routes/invoiceRoutes');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

// Database Connection
connectDB();

// Middlewares
app.use(express.json());

// CORS Configuration
// This handles overall browser requests, not just API routes
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'x-auth-token', 'Authorization'],
    credentials: true
}));

// 'uploads' folder logic — now with CORS headers
// These headers are very important to capture images using html2canvas
app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res) => {
        res.set('Access-Control-Allow-Origin', 'http://localhost:5173');
        res.set('Access-Control-Allow-Methods', 'GET, OPTIONS');
        res.set('Access-Control-Allow-Headers', 'Content-Type');
    }
}));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/clients', clientRoutes);

// Server Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on: http://localhost:${PORT}`);
});
