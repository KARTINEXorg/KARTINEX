const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); // <-- डिजिटल चाबी (Token) बनाने के लिए
const User = require('../models/User');

// --- SIGNUP ROUTE ---
router.post('/signup', async (req, res) => {
    try {
        const { name, email, phone, password } = req.body;
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'इस ईमेल से अकाउंट पहले से मौजूद है' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = new User({ name, email, phone, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'अकाउंट सफलतापूर्वक बन गया!' });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('सर्वर में कुछ गड़बड़ हुई');
    }
});

// --- LOGIN ROUTE (नया कोड) ---
router.post('/login', async (req, res) => {
    try {
        // 1. ग्राहक से ईमेल और पासवर्ड लेना
        const { email, password } = req.body;

        // 2. चेक करना कि इस ईमेल का कोई यूज़र है भी या नहीं
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'गलत ईमेल या पासवर्ड' });
        }

        // 3. भेजे गए पासवर्ड और डेटाबेस के पासवर्ड को मिलाना
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'गलत ईमेल या पासवर्ड' });
        }

        // 4. अगर सब सही है, तो एक डिजिटल चाबी (Token) बनाना
        const payload = {
            user: {
                id: user.id // चाबी के अंदर यूज़र की ID डाल रहे हैं
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET, // यह एक सीक्रेट कोड है जो हम Render में डालेंगे
            { expiresIn: '5d' }, // यह चाबी 5 दिन तक चलेगी
            (err, token) => {
                if (err) throw err;
                // 5. सक्सेस के साथ चाबी (Token) को वापस भेजना
                res.json({ token });
            }
        );

    } catch (error) {
        console.error(error.message);
        res.status(500).send('सर्वर में कुछ गड़बड़ हुई');
    }
});

module.exports = router;l
