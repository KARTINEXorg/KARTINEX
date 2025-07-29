const express = require('express');
const mongoose = require('mongoose'); // Mongoose को बुला रहे हैं (डेटाबेस से बात करने के लिए)
const app = express();

// यह हमारी सीक्रेट चाबी है, जो Render के Environment Variable से आएगी
const MONGO_URI = process.env.MONGO_URI;

// डेटाबेस से कनेक्ट करने की कोशिश
mongoose.connect(MONGO_URI)
  .then(() => {
    // अगर कनेक्शन सफल हुआ तो यह मैसेज दिखेगा
    console.log('MongoDB से सफलतापूर्वक जुड़ गया!');
  })
  .catch((err) => {
    // अगर कोई एरर आया तो यह मैसेज दिखेगा
    console.log('MongoDB से जुड़ने में एरर आया:', err);
  });

// यह हमारी वेबसाइट का मेन Backend लिंक है
app.get('/', (req, res) => {
    // अब हम नया सक्सेस मैसेज भेजेंगे
    res.send('Kartinex का Backend इंजन सफलतापूर्वक चल रहा है और डेटाबेस से जुड़ गया है!');
});

// हमारे सर्वर को एक पोर्ट पर चलने के लिए कह रहे हैं
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
