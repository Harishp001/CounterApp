# Advanced Counter App

A feature-rich counter application with history tracking, undo/redo functionality, and interactive visualizations.

![Counter App Screenshot](screenshot.png) <!-- Add screenshot if available -->

## Features

- **Basic Counter Operations**
  - Increment/Decrement buttons
  - Reset functionality
  - Space bar quick increment
- **History Management**
  - Undo/Redo operations (with keyboard shortcuts)
  - Persistent count history tracking
- **Visual Analytics**
  - Interactive line chart showing count history
  - Real-time statistics:
    - Highest count achieved
    - Total clicks/operations
    - Last updated timestamp
- **Customization**
  - Light/Dark theme toggle
  - Sound effects toggle
- **Keyboard Shortcuts**
  - Full keyboard navigation support
  - Quick access to all major functions

## Technologies Used

- **Frontend**
  - HTML5
  - CSS3 (Custom Properties for theming)
  - Vanilla JavaScript
- **Data Visualization**
  - Chart.js for history graph
- **Audio**
  - Web Audio API for sound effects

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/advanced-counter-app.git
```
No build process required - works directly in modern browsers!

⌨️ Keyboard Shortcuts
Shortcut	Action
→ or Space	Increment counter
←	Decrement counter
R	Reset counter
D	Toggle dark mode
M	Toggle sound
Ctrl + Z	Undo last action
Ctrl + Y	Redo last action
