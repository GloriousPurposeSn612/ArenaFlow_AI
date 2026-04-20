/**
 * ArenaFlow AI - Client side logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('recommendation-form');
    const resultsSection = document.getElementById('results-section');
    const errorMessage = document.getElementById('error-message');
    const submitBtn = document.getElementById('submit-btn');
    const accessibilityToggle = document.getElementById('accessibility-mode');

    // Handle accessibility mode styling overrides
    accessibilityToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.body.classList.add('accessible-mode');
        } else {
            document.body.classList.remove('accessible-mode');
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Security: Reset UI state on new submission
        resultsSection.classList.add('hidden');
        errorMessage.classList.add('hidden');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Analyzing real-time data...';

        const location = document.getElementById('location').value;
        const intent = document.getElementById('intent').value;
        const accessibilityMode = accessibilityToggle.checked;

        if (!location || !intent) {
            showError("Please select both your location and intent.");
            return;
        }

        try {
            // Efficiency: Calling local API endpoint
            const response = await fetch('/api/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ location, intent, accessibilityMode })
            });

            const responseData = await response.json();

            if (!response.ok) {
                throw new Error(responseData.error || 'Failed to get recommendation.');
            }

            displayResult(responseData.data);

        } catch (error) {
            console.error('API Error:', error);
            showError(error.message || "Unable to connect to ArenaFlow AI. Please try again later.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Get Recommendation';
        }
    });

    function displayResult(resultNode) {
        document.getElementById('result-recommendation').textContent = resultNode.recommendation;
        document.getElementById('result-explanation').textContent = resultNode.reason;
        
        const sourceMap = {
            'Gemini-AI': 'Google Gemini AI',
            'Simulated-AI': 'Offine Simulation AI',
            'AI': 'AI'
        };
        const sourceText = resultNode.source ? (sourceMap[resultNode.source] || resultNode.source) : 'AI';
        document.getElementById('result-source').textContent = sourceText;

        const safetyContainer = document.getElementById('safety-note-container');
        const safetyText = document.getElementById('result-safety');

        // Accessibility note visibility
        if (resultNode.safety_note && resultNode.safety_note !== '') {
            safetyText.textContent = resultNode.safety_note;
            safetyContainer.classList.remove('hidden');
        } else {
            safetyContainer.classList.add('hidden');
        }

        resultsSection.classList.remove('hidden');
    }

    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('hidden');
        submitBtn.disabled = false;
        submitBtn.textContent = 'Get Recommendation';
    }
});
