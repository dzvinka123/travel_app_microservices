# Getaway

GetAway is a project developed for the Web Development course. This web application enables users to create personalized trips with features such as recommendations, to-do lists, maps, and weather forecasts. The project aims to expand its capabilities to include booking accommodations and selecting transportation options for the trip (in the future).

# Workflow

Project tasks and progress are tracked in the **Issues** section.

Additionally, a GitHub Actions workflow is included to automatically check **Python code formatting** using **Black**.

# React + Vite

React is working in Vite with HMR and some ESLint rules.

With two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dependencies and run

This project relies on a **Google API key**. You must create a `.env` file in the root directory with the following environment variable:

```bash
VITE_REACT_APP_GOOGLE_API=your_api_key_here
```

1. Create a Vite Project

If not already set up:

```bash
npm create vite@latest
```

2. Install Dependencies

If using a requirements.txt for Python packages:

```bash
pip install -r requirements.txt
```

Install frontend dependencies

```bash
npm init -y
npm install
```

3. Set Up MongoDB

Start MongoDB with Docker and initiate the replica set:

```bash
docker exec -it mongo1 mongosh
```

Inside the Mongo shell:

```bash
rs.initiate({
  _id: "rs0",
  members: [
    { _id: 0, host: "mongo1:27017" },
    { _id: 1, host: "mongo2:27017" },
    { _id: 2, host: "mongo3:27017" }
  ]
});
```

4. Run the Project

- Start the website:

        ```bash
        npm run dev
        ```

- Start the services

        ```bash
        docker compose up --build
        ```

## Additional Packages  

- Date Picker
        ```bash
        npm install --save react-date-range
        npm install --save react date-fns
        ```

- Swiper (Carousel)

        ```bash
        npm install swiper
        ```

- Google Maps JavaScript API Wrapper for React

        ```bash
        npm install @googlemaps/react-wrapper
        ```

# Microservices Architecture

The core of this project is built around a microservices architecture, each responsible for a specific domain of the application:

- **User Service** – Handles user authentication, registration, and profile management. Uses **SQLite** for lightweight, persistent storage.
- **API Facade Service** – Acts as the main gateway for the frontend, orchestrating calls to various backend services and simplifying client interaction.
- **Journeys Service** – Manages travel plans, destinations, and trip-related data. Backed by **MongoDB** for flexible document storage, with communication handled through a **message queue** (Redis).
- **Weather Service** – Fetches and delivers weather forecasts for selected destinations.
- **Coords Service** – Handles geolocation processing.
- **Google Places Service** – Integrates with the **Google Places API** to provide information about nearest destination places.

[Acrhitecture](./img/GetAway_Micro_Architecture.png)

# Scenario