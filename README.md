# City Explorer

Author: Lavieng Chanthabandith
Version: 1.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
This application, City Explorer, is designed to provide a user with information about a city of their choice. When entering a valid city name and pressing "Explore!", the application fetches and displays geographic coordinates and a map for the selected city. This application serves to provide an easy way to explore cities virtually and learn more about their geographical layouts.

## Getting Started
To get this application running on your own machine, please follow these steps:

- Clone this repository to your local machine.
- Navigate to the project directory in your terminal.
- Run npm install to install the necessary dependencies.
- In the project root, create a .env file and add your LocationIQ API key (obtained from https://locationiq.com/) to it. It should be formatted as REACT_APP_LOCATIONIQ_API_KEY=YourApiKeyHere.
- Run npm start to launch the application in your local development environment.

## Architecture
This application is built using the React JavaScript library. It uses the axios library to perform API calls to LocationIQ for city information, and React Bootstrap to style and structure the application components. The application design adheres to the principles of component-based architecture, utilizing React hooks (useState) to manage component state.

## Change Log
05-08-2023 - Initial project setup, including installation of dependencies and setting up of basic project structure.
05-08-2023 - City search functionality using the LocationIQ API.
05-08-2023 - Map display feature using the static map API endpoint.
05-08-2023 - Error handling for invalid city inputs and API request failures.

## Credit and Collaborations
This project makes use of the LocationIQ APIs for city search and map display functionalities. It also uses the React Bootstrap library for component styling.