const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // <-- यह 'path' मॉड्यूल हमने नया जोड़ा है
const app = express();

// --- Middlewares ---
app.use(cors());
app.use(express.json());

// --- डेटाबेस कनेक्शन ---
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB से सफलतापूर्वक जुड़ गया!'))
  .catch((err) => console.log('MongoDB से जुड़ने में एरर आया:', err));

// --- Routes ---
app.get('/', (req, res) => {
    res.send('KARTINEX का Backend इंजन अब असली काम के लिए तैयार है!');
});

// --- यहाँ बदलाव किया गया है ---
// अब हम बिलकुल सही और पक्का रास्ता बता रहे हैं
const authRoutes = require(path.join(__dirname, 'routes', 'auth'));
app.use('/api/auth', authRoutes);

// --- सर्वर स्टार्ट ---
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
