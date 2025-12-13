# Sweet Shop Management System

## Project Explanation
This is a full-stack Sweet Shop Management System built with **Node.js/Express** (Backend) and **React** (Frontend).
It includes User Authentication, Sweets Management, and Inventory Management.

## How to Run Locally

### Prerequisites
- Node.js (v18 or higher)
- npm

### Backend
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:3000`.

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:5173`.

## My AI Usage

### Tools Used
- **Google Gemini**: Used for brainstorming, generating boilerplate code, writing test cases, and debugging.

### How I Used Them
- **Boilerplate Generation**: I used Gemini to setup the initial Express and React project structures to save time on setup.
- **TDD/Testing**: I asked Gemini to "generate Jest tests for the auth controller" to kickstart my TDD process, ensuring I had failing tests before writing logic.
- **Debugging**: When I encountered TypeScript errors, I pasted them into Gemini for quick resolution.
- **Styling**: I used Gemini to suggested Tailwind CSS classes for a modern, glassmorphism UI design.

### Reflection
AI tools significantly sped up the "plumbing" phase of the project (setup, config, boilerplate). It allowed me to focus more on the business logic and TDD flow. However, I had to review every piece of generated code to ensure it met the specific "Sweet Shop" requirements and didn't introduce unnecessary complexity. The co-authoring requirement made me very conscious of exactly when and where I was leaning on AI assistance.
