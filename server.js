const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const apiRoutes = require('./src/routes/api');
const simulationService = require('./src/services/simulationService');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security & Efficiency: Enable CORS and JSON parsing
app.use(cors());
app.use(express.json());

// Serve static frontend files (simple HTML/CSS/JS interface)
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', apiRoutes);

// Fallback for missing routes
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Only run server + simulation if NOT in test environment
if (process.env.NODE_ENV !== 'test') {
    // Start simulation
    simulationService.startSimulation();

    // Start server
    app.listen(PORT, () => {
        console.log(`ArenaFlow AI server running on port ${PORT}`);
    });
}

module.exports = app; // For testing