const express = require('express');
const router = express.Router();
const recommendationController = require('../controllers/recommendationController');

// Define API routes
router.post('/recommend', recommendationController.getRecommendation);

/**
 * Health check endpoint for Cloud Run
 */
router.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy', timestamp: new Date().toISOString() });
});

module.exports = router;
