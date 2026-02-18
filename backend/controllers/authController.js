const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register logic (Signup)
exports.register = async (req, res) => {
    try {
        const { companyName, username, password } = req.body;

        // Check if the user already exists
        let user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "User already exists with this email/username!" });
        }

        // encrypt (hash) the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Save the new user to the database
        user = new User({
            companyName,
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "Account created successfully!" });

    } catch (err) {
        res.status(500).json({ message: "Server error during registration" });
    }
};

// Login logic
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid email/username. Please register first!" });
        }

        // Check if the password is correct
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect password!" });
        }

        // Generate a token if the password is correct
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '30d' }
        );

        res.json({
            token,
            user: {
                id: user._id,
                username: user.username,
                companyName: user.companyName
            },
            message: "Login successful!"
        });

    } catch (err) {
        res.status(500).json({ message: "Server error during login" });
    }
};