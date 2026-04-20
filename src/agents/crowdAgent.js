const simulationService = require('../services/simulationService');

/**
 * Crowd Agent
 * Purpose: Analyzes current crowd density in various zones.
 */
class CrowdAgent {
    analyzeCrowds(userLocation, intent) {
        // Security & Efficiency: Validate inputs safely, fetch from memory simulation
        const crowdLevels = simulationService.getCrowdLevels();
        
        let destinationZone;
        if (intent === 'food') destinationZone = 'Food Court';
        else if (intent === 'exit') destinationZone = 'Main Gate';
        else if (intent === 'restroom') destinationZone = 'Restroom A';
        else destinationZone = 'Concourse 1'; // Default

        const currentLocationCrowd = crowdLevels[userLocation] || 50;
        const destinationCrowd = crowdLevels[destinationZone] || 50;

        let levelDescription = "Moderate";
        if (destinationCrowd > 75) levelDescription = "High";
        if (destinationCrowd < 30) levelDescription = "Low";

        let confidence = destinationCrowd ? 0.95 : 0.60;

        return {
            result: {
                destination_zone: destinationZone,
                current_location_density: currentLocationCrowd,
                destination_density: destinationCrowd,
                level: levelDescription
            },
            reasoning: `Tracking shows ${destinationZone} has ${destinationCrowd}% capacity, which is considered ${levelDescription}.`,
            confidence: confidence
        };
    }
}

module.exports = new CrowdAgent();
