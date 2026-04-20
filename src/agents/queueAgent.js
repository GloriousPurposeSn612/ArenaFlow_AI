const simulationService = require('../services/simulationService');

/**
 * Queue Agent
 * Purpose: Predicts wait times based on available queue data.
 */
class QueueAgent {
    predictWait(intent) {
        const queueTimes = simulationService.getQueueTimes();
        
        let facility;
        if (intent === 'food') facility = 'Burger Stand'; // Fallback logic
        else if (intent === 'exit') facility = 'Main Gate';
        else if (intent === 'restroom') facility = 'Restroom A';
        else facility = 'Pizza Corner';

        let waitMinutes = queueTimes[facility] || 0;
        
        let waitCategory = "Short";
        if (waitMinutes > 20) waitCategory = "Long";
        else if (waitMinutes > 10) waitCategory = "Moderate";

        return {
            result: {
                facility: facility,
                predicted_wait: waitMinutes,
                category: waitCategory
            },
            reasoning: `Queue estimation for ${facility} is ${waitCategory} at ${waitMinutes} minutes based on real-time simulated data.`,
            confidence: waitMinutes ? 0.90 : 0.50
        };
    }
}

module.exports = new QueueAgent();
