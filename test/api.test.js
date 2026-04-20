const request = require('supertest');
const app = require('../server');

describe('API Integration Tests', () => {

    test('POST /api/recommend should return 400 if validation fails format', async () => {
        const response = await request(app)
            .post('/api/recommend')
            .send({ location: 'Main Gate' }); // Missing intent
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('POST /api/recommend should return 400 if intent is unrecognized', async () => {
        const response = await request(app)
            .post('/api/recommend')
            .send({ location: 'Main Gate', intent: 'fly' }); // Invalid intent
        
        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty('error');
    });

    test('POST /api/recommend should return success response (fallback AI)', async () => {
        const response = await request(app)
            .post('/api/recommend')
            .send({
                location: 'Main Gate',
                intent: 'food',
                accessibilityMode: false
            });

        expect(response.status).toBe(200);
        expect(response.body.status).toBe('success');
        
        const data = response.body.data;
        expect(data).toHaveProperty('recommendation');
        expect(data).toHaveProperty('reason');
        expect(data).toHaveProperty('source');
        expect(data).toHaveProperty('confidence');
    });

    test('POST /api/recommend should incorporate accessibilityMode logic (fallback AI)', async () => {
        const response = await request(app)
            .post('/api/recommend')
            .send({
                location: 'Main Gate',
                intent: 'food',
                accessibilityMode: true
            });

        expect(response.status).toBe(200);
        const data = response.body.data;
        // The fallback behavior specifically sets safety_note when accessibilityMode is true
        expect(data).toHaveProperty('safety_note');
        expect(data.safety_note.length).toBeGreaterThan(0);
    });

});
