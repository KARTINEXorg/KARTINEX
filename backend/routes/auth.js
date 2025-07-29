const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // पासवर्ड को सुरक्षित करने के लिए
const User = require('../models/User'); // हमारे यूजर ब्लूप्रिंट को बुला रहे हैं

// Signup का रास्ता (Endpoint)
// POST /api/auth/signup
router.post('/signup', async (req, res) => {
    try {
        // 1. ग्राहक से डेटा लेना
        const { name, email, phone, password } = req.body;

        // 2. चेक करना कि कहीं यह ग्राहक पहले से तो नहीं है
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'इस ईमेल से अकाउंट पहले से मौजूद है' });
        }

        // 3. पासवर्ड को सुरक्षित (Hash) करना
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 4. नया यूजर बनाना
        user = new User({
            name,
            email,
            phone,
            password: hashedPassword, // सुरक्षित पासवर्ड स्टोर करना
        });

        // 5. नए यूजर को डेटाबेस में सेव करना
        await user.save();

        // 6. सक्सेस का मैसेज भेजना
        res.status(201).json({ message: 'अकाउंट सफलतापूर्वक बन गया!' });

    } catch (error) {
        console.error(error.message);
        res.status(500).send('सर्वर में कुछ गड़बड़ हुई');
    }
});

module.exports = router;
