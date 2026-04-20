const assistantAgent = require('../agents/assistantAgent');
const logger = require('../utils/logger');

/**
 * Controller for handling recommendation API requests.
 */
exports.getRecommendation = async (req, res) => {
    try {
        const { location, intent, accessibilityMode } = req.body;

        // Security: Input validation
        if (!location || typeof location !== 'string' || location.trim() === '') {
            logger.warn('RecommendationController', 'Invalid location provided');
            return res.status(400).json({ error: 'Missing or invalid location parameter.' });
        }
        
        if (!intent || typeof intent !== 'string' || !['food', 'restroom', 'exit'].includes(intent.toLowerCase())) {
            logger.warn('RecommendationController', `Invalid intent provided: ${intent}`);
            return res.status(400).json({ error: 'Missing or invalid intent parameter.' });
        }

        // Convert accessibilityMode to boolean properly and validate
        const isAccessible = accessibilityMode === true || accessibilityMode === 'true';
        
        logger.info('RecommendationController', 'Processing recommendation request', { location, intent, isAccessible });

        // Get recommendation from the orchestrator agent
        const recommendationData = await assistantAgent.getRecommendation(location, intent.toLowerCase(), isAccessible);

        // Security Note: Output is formatted securely for consumption
        logger.info('RecommendationController', 'Successfully generated recommendation');
        return res.status(200).json({
            status: 'success',
            data: recommendationData
        });
        
    } catch (error) {
        // Security & Stability: Catch and log errors without exposing internal stack traces
        logger.error('RecommendationController', 'Error generating recommendation', error);
        return res.status(500).json({
            error: 'An internal server error occurred while processing the recommendation.'
        });
    }
};
