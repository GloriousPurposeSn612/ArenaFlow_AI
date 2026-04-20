# ArenaFlow AI - Smart Event Copilot

ArenaFlow AI is a robust, production-ready web application designed to improve attendee experience in large-scale sporting venues by optimizing crowd movement, reducing waiting times, and providing real-time intelligent recommendations.

## Overview

The system employs a multi-agent backend architecture connected to a front-end interface. It is light on dependencies and utilizes an in-memory simulation to model dynamic live crowd and queue behaviors seamlessly. 

## Features

- **Multi-Agent Architecture**: 
  - `Crowd Agent`: Models live capacity in various zones.
  - `Queue Agent`: Estimates facility wait times.
  - `Navigator Agent`: Chooses paths based on constraints and safety.
  - `Assistant Agent`: Orchestrates insights and generates a final AI response.
- **Accessibility Mode**: Optimizes routing for safer, less-crowded paths and simplifies natural language output.
- **Generative AI Integration**: Wraps Google Generative AI (`@google/generative-ai`) to structure the optimal instruction for the user, with a built-in fallback mock for environments without API keys.
- **Dynamic Simulation**: Periodic interval-based memory simulator (0 DB queries needed).
- **Premium Frontend**: Vanilla HTML/CSS interface built with pure semantic focus, accessible structure, responsive design, and CSS token variables.

## Architecture

```
ArenaFlow_AI/
│
├── src/
│   ├── agents/          # Domain-specific agents (Crowd, Queue, Navigator, Assistant)
│   ├── controllers/     # API request handling logic
│   ├── routes/          # Express route definitions
│   └── services/        # Generative AI wrapper & Simulation logic
├── public/              # Static Frontend assets (HTML, CSS, JS)
├── test/                # Jest testing suite
├── server.js            # Main application entrypoint
├── Dockerfile           # Deployment definition for Cloud Run
└── package.json         # Dependencies
```

## Google Services Usage

This application leverages the **Google Generative AI SDK** (`@google/generative-ai`) to intelligently parse live simulation data. By fetching the current model capacity insights internally, the `AssistantAgent` sends a zero-shot prompt requesting a structured JSON response formatted into an actionable, accessible string for users. 
If an API key is not present, it fails gracefully over to an internal logic switch performing identical calculations deterministically.

## Setup Instructions

1. **Install Dependencies**
   Run `npm install` inside the project folder.

2. **Environment Variables**
   Copy `.env.example` to `.env`. 
   Optionally add your Google Cloud `GEMINI_API_KEY`. If left empty, the application will cleanly fallback to a functional local simulation.

3. **Start Application**
   Run `npm start`
   Access the frontend at `http://localhost:8080/`.

4. **Testing**
   Run `npm test` to execute the Jest suite for agents and API endpoints.

## Assumptions

- Mock Simulation: The real-time venue status is simulated in-memory rather than pulled from physical sensors.
- Agent Output: The structure requires the agents to define `result`, `reasoning`, and `confidence`.
- Deployment: Assumes deployment on a container engine like Google Cloud Run via the included Dockerfile. 

## Aesthetics & Accessibility
The frontend applies an `accessible-mode` CSS class which enlarges fonts, implements dark high-contrast borders, relies primarily on native OS colors, and explicitly leverages `aria-live` regions for announcements.