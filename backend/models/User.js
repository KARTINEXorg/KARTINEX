const mongoose = require('mongoose');

// यह यूजर का ब्लूप्रिंट है
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // हर यूजर का ईमेल अलग होगा
    },
    phone: {
        type: String,
        required: true,
        unique: true, // हर यूजर का फ़ोन नंबर अलग होगा
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true }); // यह अपने-आप बनने की और अपडेट होने की तारीख जोड़ देगा

// इस ब्लूप्रिंट को बाहर भेज रहे हैं ताकि दूसरी फाइलें इसे इस्तेमाल कर सकें
module.exports = mongoose.model('User', userSchema);
