require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors({
  origin: 'https://oavsuradacs.netlify.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.options('*', cors()); // handle preflight requests
