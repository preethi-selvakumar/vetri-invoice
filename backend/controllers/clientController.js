const Client = require('../models/Client');
const Invoice = require('../models/Invoice');

// Retrieve all clients for the user
exports.getUserClients = async (req, res) => {
    try {
        const clients = await Client.find({ user: req.user.id }).sort({ createdAt: -1 });

        const clientsWithStats = await Promise.all(clients.map(async (client) => {
            // Use a regex for strict email matching
            const invoices = await Invoice.find({
                user: req.user.id,
                "billTo.email": { $regex: new RegExp(`^${client.email.trim()}$`, "i") }
            });

            const totalBilled = invoices.reduce((sum, inv) => sum + (inv.subTotal || 0), 0);

            return {
                ...client._doc,
                invoiceCount: invoices.length,
                totalBilled: totalBilled,
                receivedAmount: client.receivedAmount || 0
            };
        }));

        res.json(clientsWithStats);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error fetching clients" });
    }
};

// Client Payment Update (With Auto-Invoice Adjustment)
exports.updateClientPayment = async (req, res) => {
    try {
        const { receivedAmount } = req.body;
        const totalReceived = Number(receivedAmount);

        // Update the client’s total received amount
        const client = await Client.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id },
            { $set: { receivedAmount: totalReceived } },
            { new: true }
        );

        if (!client) return res.status(404).json({ message: "Client not found" });

        // Auto-Adjust Logic: Split the payment across invoices
        // Fetch invoices using the client email (case-insensitive)
        const invoices = await Invoice.find({
            user: req.user.id,
            "billTo.email": { $regex: new RegExp(`^${client.email.trim()}$`, "i") }
        }).sort({ "invoiceMeta.invoiceDate": 1 });

        let remainingPayment = totalReceived;

        // Iterate through each invoice and update the amount
        for (let invoice of invoices) {
            const invoiceTotal = Number(invoice.subTotal || 0);

            if (remainingPayment <= 0) {
                invoice.receivedAmount = 0;
            } else if (remainingPayment >= invoiceTotal) {
                invoice.receivedAmount = invoiceTotal;
                remainingPayment -= invoiceTotal;
            } else {
                invoice.receivedAmount = remainingPayment;
                remainingPayment = 0;
            }

            await invoice.save();
        }

        res.json({ message: "Payment updated and invoices adjusted successfully", client });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error updating payment" });
    }
};

// Delete the Client
exports.deleteClient = async (req, res) => {
    try {
        await Client.findOneAndDelete({ _id: req.params.id, user: req.user.id });
        res.json({ message: "Client deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting client" });
    }
};