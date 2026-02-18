const Invoice = require('../models/Invoice');
const Client = require('../models/Client');
const nodemailer = require('nodemailer');
const fs = require('fs');

//  get next invoice number
exports.getNextInvoiceNumber = async (req, res) => {
    try {
        const count = await Invoice.countDocuments({ user: req.user.id });
        const nextNumber = count + 1;
        const formattedNumber = `INV-${String(nextNumber).padStart(3, '0')}`;
        res.json({ nextNumber: formattedNumber });
    } catch (err) {
        res.status(500).json({ message: "Error fetching next invoice number" });
    }
};

// create invoice and auto-save client
exports.createInvoice = async (req, res) => {
    try {
        let invoiceData = {
            headerData: JSON.parse(req.body.headerData),
            billTo: JSON.parse(req.body.billTo),
            invoiceMeta: JSON.parse(req.body.invoiceMeta),
            invoiceItems: JSON.parse(req.body.invoiceItems),
            paymentInfo: JSON.parse(req.body.paymentInfo),
            notesSettings: JSON.parse(req.body.notesSettings),
            template: req.body.template,
            subTotal: Number(req.body.subTotal),
            user: req.user.id,
            receivedAmount: 0
        };

        if (req.files) {
            if (req.files['logo']) {
                invoiceData.headerData.logo = `uploads/${req.files['logo'][0].filename}`;
            }
            if (req.files['qrCodeImage']) {
                invoiceData.paymentInfo.qrCodeImage = `uploads/${req.files['qrCodeImage'][0].filename}`;
            }
        }

        const existingClient = await Client.findOne({
            email: invoiceData.billTo.email,
            user: req.user.id
        });

        if (!existingClient) {
            const newClient = new Client({
                clientName: invoiceData.billTo.clientName,
                companyName: invoiceData.billTo.companyName,
                email: invoiceData.billTo.email,
                address: invoiceData.billTo.address,
                cityState: invoiceData.billTo.cityState,
                country: invoiceData.billTo.country,
                user: req.user.id,
                receivedAmount: 0
            });
            await newClient.save();
        }

        const newInvoice = new Invoice(invoiceData);
        const savedInvoice = await newInvoice.save();

        res.status(201).json({
            message: "Invoice generated & Client saved!",
            invoice: savedInvoice
        });

    } catch (err) {
        console.error("Create Invoice Error:", err);
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// send invoice via email
exports.sendInvoiceMail = async (req, res) => {
    try {
        // 'companyName' and 'senderEmail' (user mail) will come from front-end formData
        const { email, clientName, invoiceNumber, companyName, senderEmail } = req.body;
        const pdfFile = req.file;

        if (!pdfFile) {
            return res.status(400).json({ message: "PDF file is required" });
        }

        const cleanName = clientName.trim().replace(/\s+/g, '_');
        const attachmentName = `${cleanName}_Invoice.pdf`;

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            // display name added
            from: `"${companyName || 'Invoice System'}" <${process.env.EMAIL_USER}>`,
            to: email,
            // client reply will go to that specific user
            replyTo: senderEmail || process.env.EMAIL_USER,

            subject: `Invoice ${invoiceNumber} from ${companyName || 'Our Company'}`,
            text: `Hi ${clientName},\n\nPlease find the attached invoice ${invoiceNumber} for your recent purchase.\n\nRegards,\n${companyName || 'Your Company Name'}`,
            attachments: [
                {
                    filename: attachmentName,
                    path: pdfFile.path
                }
            ]
        };

        await transporter.sendMail(mailOptions);
        fs.unlinkSync(pdfFile.path);

        res.json({ message: `Email sent successfully to ${clientName}!` });

    } catch (err) {
        console.error("Email Error:", err);
        // sending 401 error status for token redirection logic
        res.status(401).json({ message: "Session expired or Mail failed", error: err.message });
    }
};

// get all user invoices
exports.getUserInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ user: req.user.id }).sort({ createdAt: -1 });
        res.json(invoices);
    } catch (err) {
        res.status(500).json({ message: "Error fetching invoices" });
    }
};

// get single invoice by id
exports.getInvoiceById = async (req, res) => {
    try {
        const invoice = await Invoice.findOne({
            _id: req.params.id,
            user: req.user.id
        });

        if (!invoice) return res.status(404).json({ message: "Invoice not found" });
        res.json(invoice);
    } catch (err) {
        res.status(500).json({ message: "Server Error" });
    }
};