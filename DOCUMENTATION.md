# Voice Command Shopping Assistant – Project Documentation

This project is a Voice Command Shopping Assistant built using React and Vite. The aim was to create a simple and interactive web application where users can manage their shopping list using voice commands instead of typing.

I used the Web Speech API to capture voice input and convert it into text. Instead of using any third-party NLP libraries, I implemented my own command parsing logic to identify actions like add, remove, modify, and search. The parser extracts the action, item name, and quantity from the spoken text.

Based on the parsed result, the application updates the shopping list dynamically using React state management. I also implemented category-based grouping of items, smart suggestions (related, seasonal, and substitutes), and price-based product search (e.g., “search milk under 5”).

The UI is styled using clean CSS with a responsive card-based layout. The project is deployed using GitHub and Vercel.
This project demonstrates my understanding of React, state handling, voice integration, manual parsing logic, and full deployment workflow.
