# CarbonAware - AI Climate Coach & Impact Tracker

CarbonAware is a highly optimized, dynamic assistant designed to help individuals calculate, monitor, and reduce their environmental footprint to support global biodiversity and climate action. 

## Chosen Vertical
**Environmental Sustainability / Climate Tech**

This solution addresses the urgent 2026 climate crisis by acting as a "smart, dynamic assistant" (AI Climate Coach). It empowers users to understand the hidden environmental costs of their daily actions—ranging from transport and diet to energy consumption—and provides real-time, context-aware recommendations to reduce their impact.

## Approach and Logic
Our logic is rooted in combining psychological positive reinforcement with strict, science-backed environmental data:

1. **Dynamic Assistant Persona:** The application features an "AI Climate Coach" on the Insights dashboard. Rather than just showing raw numbers, the assistant evaluates the user's highest emission categories and offers context-aware, actionable advice (e.g., suggesting a shift to public transit if Transport emissions spike).
2. **Real-time State Management:** We utilized Zustand for lightweight, lightning-fast state management, ensuring that calculating emissions and applying them to the user's profile happens instantaneously without server latency.
3. **Gamification & Leaderboard:** To encourage sustained usage, we integrated a "Green Score" algorithm. Users earn points for low-impact choices, which dynamically updates their ranking on a global leaderboard, fostering community-driven climate action.
4. **Performance & Security:** The application was built on Next.js with strict performance constraints. We enforced 100% test coverage on our core business logic and implemented advanced Content-Security-Policy (CSP) headers to ensure enterprise-grade security and a repository size well under the 10MB limit.

## How the Solution Works
1. **Log Activity:** Users navigate to the "Calculate Impact" form. They select an activity category (e.g., Transport, Diet, Electricity).
2. **Instant Calculation:** The app calculates the exact kg CO2e impact using verified EPA and IPCC multiplier constants.
3. **Emotional Feedback:** Based on the severity of the emission, the UI dynamically reacts. High-impact actions trigger visual warnings, while low-impact actions reward the user with Green Points.
4. **Live Dashboard & Insights:** The Dashboard and Insights pages instantly aggregate this data into interactive charts. The AI Climate Coach reads this aggregate data to present personalized environmental strategies.

## Any Assumptions Made
1. **Local Storage Persistence:** We assumed that for a rapid, lightweight tracking assistant, maintaining data in the browser's local storage (via Zustand persist) provides a superior, friction-free user experience compared to forcing users through a heavy authentication pipeline.
2. **Standardized Multipliers:** We assumed standard global averages for carbon calculations (e.g., average US grid electricity emissions, standard gasoline car mpg). While regional variations exist, these global averages provide the most accessible baseline for a general audience.
3. **Single User Persona per Device:** Because data is locally persisted, we assume the primary use-case is a single individual tracking their personal footprint on their own personal device.
