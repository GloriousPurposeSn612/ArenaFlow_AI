const crowdAgent = require('../src/agents/crowdAgent');
const queueAgent = require('../src/agents/queueAgent');
const navigatorAgent = require('../src/agents/navigatorAgent');

describe('Agents Unit Tests', () => {

    test('CrowdAgent should return expected structure with confidence', () => {
        const result = crowdAgent.analyzeCrowds('Main Gate', 'food');
        
        expect(result).toHaveProperty('result');
        expect(result).toHaveProperty('reasoning');
        expect(result).toHaveProperty('confidence');
        
        expect(result.result).toHaveProperty('destination_zone', 'Food Court');
        expect(typeof result.confidence).toBe('number');
    });

    test('QueueAgent should fallback to Burger Stand for food intent', () => {
        const result = queueAgent.predictWait('food');
        expect(result.result.facility).toBe('Burger Stand');
        expect(typeof result.result.predicted_wait).toBe('number');
    });

    test('NavigatorAgent should branch logic based on accessibilityMode', () => {
        const standardResult = navigatorAgent.optimizeRoute('Main Gate', 'Food Court', false);
        const accessibleResult = navigatorAgent.optimizeRoute('Main Gate', 'Food Court', true);

        expect(standardResult.result.recommended_route).toContain('Express');
        expect(accessibleResult.result.recommended_route).toContain('Accessible');
        expect(standardResult.result.distance_estimation_meters).toBeLessThan(accessibleResult.result.distance_estimation_meters);
    });

});
