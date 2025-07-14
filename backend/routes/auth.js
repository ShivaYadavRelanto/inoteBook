const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const User = require('../models/user');

router.post('/createUser', [
    body('name').isLength({ min: 3 }),
    body('password', "Password should contain more than 3 characters").isLength({ min: 5 }),
    body('email').isEmail()
], async (req, res) => {
    // Validate incoming data
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
        // ✅ Save user to MongoDB
        const user = new User({ name, email, password });
        await user.save(); // Use await to wait for the save operation to complete

        res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
        console.error("Error while saving user:", error.message);

        // Check for duplicate key error (E11000 is MongoDB's duplicate key error code)
        if (error.code === 11000) {
            return res.status(400).json({
                message: 'Duplicate key error',
                error: error.message,
                key: error.keyValue // This will tell you which field caused the duplicate error
            });
        }

        // If it's any other error, handle it as a generic internal server error
        res.status(500).json({
            message: 'Internal Server Error',
            error: error.message // Detailed error message
        });
    }
});

module.exports = router;
