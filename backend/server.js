const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Init Middleware
app.use(cors());
app.use(express.json());

// Connect to Database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
};
connectDB();

// Define Routes
app.get('/', (req, res) => res.send('KARTINEX API Running... Ready for business!'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
