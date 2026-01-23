# Korea Food Map Project Blueprint

## Overview

This project aims to create an interactive web page displaying a map of South Korea. Users can click on different regions of the map to discover famous local restaurants. The application will feature a modern design with both light and dark mode options.

## Features & Design

### Core Functionality
- **Interactive Map:** An SVG-based map of South Korea with clearly defined, clickable regions (provinces and major cities).
- **Restaurant Information:** Clicking a region will trigger a modal or sidebar displaying a curated list of well-known restaurants in that area. Each entry will include the restaurant's name, a brief description, and its specialty.
- **Theme Toggle:** A user-friendly switch in the top-right corner to toggle between light and dark themes.

### Design Principles
- **Aesthetics:** A clean, visually balanced layout that creates a premium and intuitive user experience.
- **Color & Typography:** A vibrant and energetic color palette will be used. Expressive typography will guide the user's attention.
- **Interactivity:** Smooth animations and visual feedback (hover effects, transitions) will be implemented to enhance user engagement. Buttons and interactive elements will have a subtle "glow" effect.
- **Layout:** The application will be mobile-responsive, ensuring a seamless experience across all screen sizes.

## Technical Implementation
- **Frontend:** The application will be built using modern, framework-less web technologies (HTML, CSS, JavaScript) as per the project guidelines.
- **Web Components:** Reusable UI elements, such as the restaurant modal and theme switch, will be built as encapsulated Web Components.
- **Data:** Map and restaurant data will be stored in a structured format within `data.js`.
- **Styling:** Modern CSS features like CSS Variables, Cascade Layers (`@layer`), and the `:has()` selector will be utilized for maintainable and powerful styling.

## Development Plan

1.  **[Done] Gather data for the map and restaurants.**
2.  **[Done] Design the UI/UX for the page.**
3.  **[Done] Set up the basic HTML structure.**
4.  **[Done] Implement the interactive map with a background image and positioned regions (more accurate positioning).**
5.  **[Done] Implement the restaurant information display.**
6.  **[Done] Implement the light/dark mode functionality.**
7.  **[Done] Style the page with CSS.**
8.  **[Done] Implement Disqus comment section.**
9.  **[Done] Implement Formspree contact form.**
10. **[pending] Review and test the application.**
11. **[pending] Commit and push the code to the GitHub repository.**