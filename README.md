# Getaway

GetAway is a project developed for the Web Development course. This web application enables users to create personalized trips with features such as recommendations, to-do lists, maps, and weather forecasts. The project aims to expand its capabilities to include booking accommodations and selecting transportation options for the trip (in the future).

# React + Vite

React is working in Vite with HMR and some ESLint rules.

With two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Dependencies and run

The project significantly relies on the Google API key, so it is required that you create a ```.env``` file with the key defined as VITE_REACT_APP_GOOGLE_API.

To start project:

```
npm create vite@latest
```

To run and install dependencies project:

```
npm install
npm run dev
```

To run server project:

```
cd backend_part
npm install
npm run dev
```

To install DatePicker:

```
npm install --save react-date-range
npm install --save react date-fns
```

To install Swiper:

```
npm install swiper
```

To wrap React components and load the Google Maps JavaScript API:

```
npm install @googlemaps/react-wrapper
```
