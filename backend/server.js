const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

// Load environment variables if present
require('dotenv').config({ path: path.join(__dirname, '.env') });

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const allowedOrigins = (process.env.CORS_ORIGIN || 'http://localhost:8080,http://127.0.0.1:8080,http://localhost:3000,http://127.0.0.1:3000')
  .split(',')
  .map(o => o.trim())
  .filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1 || origin.includes('localhost') || origin.includes('127.0.0.1')) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    app: 'BHUKH LAGI Backend Service',
    timestamp: new Date().toISOString()
  });
});

// Serve frontend static assets from parent directory
const frontendRoot = path.join(__dirname, '..');
app.use(express.static(frontendRoot));

// Fallback to index.html for frontend client routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  const indexPath = path.join(frontendRoot, 'index.html');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    next();
  }
});

// Start server if not imported by test suite
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  BHUKH LAGI Backend Service running                `);
    console.log(`  Listening on: http://localhost:${PORT}             `);
    console.log(`  API Health:   http://localhost:${PORT}/api/health  `);
    console.log(`====================================================`);
  });
}

module.exports = app;
