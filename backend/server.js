require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const chatRoutes = require('./routes/chat');
const authRoutes = require('./routes/auth').router;
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');

const app = express();
const PORT = process.env.PORT || 5001;
const MONGO_URI =
  process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/hospital-management';
const allowedOrigins = Array.from(
  new Set(
    [
      process.env.CLIENT_URL,
      ...(process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : []),
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
    ].filter(Boolean)
  )
);

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
  res.redirect(frontendUrl);
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Hospital Management API is running',
    timestamp: new Date().toISOString(),
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/chat', chatRoutes);

mongoose.set('strictQuery', true);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
    process.exit(1);
  });

module.exports = app;
