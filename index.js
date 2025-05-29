const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const router = require('./routes/router');

const app = express();

app.use(express.json());
app.use(cors());

// Use router
app.use('/api', router);

// Serve React frontend
app.use(express.static(path.join(__dirname, 'clientside', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'clientside', 'build', 'index.html'));
});

const PORT = process.env.PORT || 8006;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});

console.log("PORT value:", process.env.PORT);
