const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

// --- Middlewares को सबसे ऊपर रखना सबसे अच्छा होता है ---
app.use(cors());
app.use(express.json({ extended: false })); // <-- यह लाइन सर्वर को JSON पढ़ना सिखाती है

// --- Routes ---
app.get('/', (req, res) => {
    res.send('KARTINEX का Backend इंजन अब असली काम के लिए तैयार है!');
});
// हमारे auth routes को इस्तेमाल करने के लिए
app.use('/api/auth', require(path.join(__dirname, 'routes', 'auth')));

// --- डेटाबेस कनेक्शन ---
const MONGO_URI = process.env.MONGO_URI;
const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB से सफलतापूर्वक जुड़ गया!');
    } catch (err) {
        console.error('MongoDB से जुड़ने में एरर आया:', err.message);
        process.exit(1); // अगर डेटाबेस कनेक्ट न हो तो सर्वर बंद कर दो
    }
};
connectDB();

// --- सर्वर स्टार्ट ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
