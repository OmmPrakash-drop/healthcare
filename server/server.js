require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const patientRoutes = require('./routes/patientRoutes');
const volunteerRoutes = require('./routes/volunteerRoutes');
const contactRoutes = require('./routes/contactRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log('MongoDB Connection Error:', err));

// Routes
app.use('/api/patient', patientRoutes);
app.use('/api/volunteer', volunteerRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Healthcare API is running' });
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});