/**
 * ArenaFlow AI - Simulation Service
 * Efficiency Note: We use an in-memory simulation instead of a heavy database
 * to keep the application lightweight and responsive. This mimics real-time
 * crowd movement and queue times dynamically.
 */

class SimulationService {
    constructor() {
        this.simulationInterval = null;
        
        // Clearly structured mock data for crowds (0-100% capacity)
        this.crowdData = {
            'Main Gate': 45,
            'South Gate': 20,
            'East Gate': 80,
            'Food Court': 60,
            'Restroom A': 30,
            'Restroom B': 90,
            'Concourse 1': 50,
            'Concourse 2': 25
        };

        // Mock data for queue wait times in minutes
        this.queueData = {
            'Burger Stand': 15,
            'Pizza Corner': 5,
            'Restroom A': 2,
            'Restroom B': 12,
            'Main Gate': 10,
            'Merchandise': 8
        };
    }

    startSimulation() {
        if (this.simulationInterval) return;

        // Periodic updates using intervals to simulate real-time behavior
        this.simulationInterval = setInterval(() => {
            this._updateCrowdData();
            this._updateQueueData();
            // console.log('[Simulation] Data updated to mimic real-time events.');
        }, 10000); // Update every 10 seconds
    }

    stopSimulation() {
        if (this.simulationInterval) {
            clearInterval(this.simulationInterval);
            this.simulationInterval = null;
        }
    }

    _updateCrowdData() {
        for (const zone in this.crowdData) {
            // Fluctuate crowd density between -10 and +10, bounded by 0-100
            const change = Math.floor(Math.random() * 21) - 10;
            let newVal = this.crowdData[zone] + change;
            if (newVal < 0) newVal = 0;
            if (newVal > 100) newVal = 100;
            this.crowdData[zone] = newVal;
        }
    }

    _updateQueueData() {
        for (const facility in this.queueData) {
            // Fluctuate wait times slightly (between -2 and +3 minutes), bounded by 0-45
            const change = Math.floor(Math.random() * 6) - 2;
            let newVal = this.queueData[facility] + change;
            if (newVal < 0) newVal = 0;
            if (newVal > 45) newVal = 45;
            this.queueData[facility] = newVal;
        }
    }

    getCrowdLevels() {
        return { ...this.crowdData };
    }

    getQueueTimes() {
        return { ...this.queueData };
    }
}

module.exports = new SimulationService();
