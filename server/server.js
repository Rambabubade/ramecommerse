const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 5000;
const cookieParser = require('cookie-parser'); 
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());  // Parses incoming requests with JSON payloads
app.use(bodyParser.json());  // Parses incoming request bodies in a middleware before your handlers
app.use(cookieParser()); 
app.use('/uploads', express.static('uploads'));  // Serves static files from 'uploads' directory

// Root route
app.get('/', (req, res) => {
    res.json({ "msg": "hello this is mern" });
});

// Routes
app.use('/user', require('./routes/useRouter.js'));
app.use('/api', require('./routes/categoryRouter.js'));
app.use('/api/upload', require('./routes/upload.js'));
app.use('/api', require('./routes/productRouter.js'));

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI;  // Fixed the typo in the variable name
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true  // Set to true as recommended by Mongoose
})
.then(() => {
    console.log('MongoDB connected');
})
.catch(err => {
    console.error('Error connecting to MongoDB:', err);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
