const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // यह Frontend और Backend को बात करने की इजाज़त देगा
const app = express();

// --- Middlewares ---
app.use(cors()); // CORS को इस्तेमाल करने के लिए
app.use(express.json()); // सर्वर को JSON समझने के लिए

// --- डेटाबेस कनेक्शन ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB से सफलतापूर्वक जुड़ गया!'))
  .catch((err) => console.log('MongoDB से जुड़ने में एरर आया:', err));

// --- Routes ---
app.get('/', (req, res) => {
    res.send('KARTINEX का Backend इंजन अब असली काम के लिए तैयार है!');
});
// हमारे नए auth routes को इस्तेमाल करने के लिए
app.use('/api/auth', require('./routes/auth'));

// --- सर्वर स्टार्ट ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
