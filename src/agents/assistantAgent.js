const crowdAgent = require('./crowdAgent');
const queueAgent = require('./queueAgent');
const navigatorAgent = require('./navigatorAgent');
const geminiService = require('../services/geminiService');

/**
 * Assistant Agent
 * Purpose: Orchestrator agent that combines insights from Crowd, Queue, and Navigator.
 * It passes the aggregate data to Gemini for a human-readable recommendation.
 */
class AssistantAgent {
    async getRecommendation(userLocation, intent, accessibilityMode) {
        // Step 1: Gather insights independently
        const crowdInsight = crowdAgent.analyzeCrowds(userLocation, intent);
        const queueInsight = queueAgent.predictWait(intent);
        
        // Step 2: Pass crowd data to navigation for route selection
        const navInsight = navigatorAgent.optimizeRoute(userLocation, crowdInsight.result.destination_zone, accessibilityMode);

        const combinedData = {
            crowd: crowdInsight,
            queue: queueInsight,
            navigator: navInsight
        };

        // Step 3: Use the AI Service Wrapper to format and intelligently summarize
        const finalResponse = await geminiService.generateRecommendation(combinedData, accessibilityMode);

        const computedConfidence = (crowdInsight.confidence + queueInsight.confidence + navInsight.confidence) / 3;

        return {
            recommendation: finalResponse.recommendation,
            reason: finalResponse.reason,
            confidence: finalResponse.confidence || computedConfidence,
            source: finalResponse.source,
            safety_note: finalResponse.safety_note
        };
    }
}

module.exports = new AssistantAgent();
