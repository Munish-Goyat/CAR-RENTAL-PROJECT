const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(__dirname)); // Serve all static files in root

// Route for price calculation (from rent.js)
app.post('/calculate-payment', (req, res) => {
  const { startTime, endTime, pricePerHour } = req.body;

  const start = new Date(startTime);
  const end = new Date(endTime);
  const hours = (end - start) / (1000 * 60 * 60);

  if (isNaN(hours) || hours <= 0) {
    return res.status(400).json({ error: 'Invalid time range' });
  }

  const total = parseFloat((hours * pricePerHour).toFixed(2));
  res.json({ totalHours: hours.toFixed(1), totalAmount: total });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
