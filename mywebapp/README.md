# Math Practice

An interactive PWA built with Flask to practice arithmetic.

## Overview

Train four core operations with generated problems:
- **Addition** ➕
- **Subtraction** ➖
- **Multiplication** ✖️
- **Division** ➗ (always whole-number answers)

Each operation has three difficulty levels:
- 🟢 **Easy** – small numbers
- 🟡 **Medium** – medium numbers
- 🔴 **Hard** – larger numbers

## Project structure

```
mywebapp/
├── app.py                 # Flask entry point
├── requirements.txt       # Python dependencies
├── templates/
│   └── index.html         # Main single-page UI
├── static/
│   ├── manifest.json      # Web App Manifest (PWA)
│   ├── service-worker.js  # Service Worker for offline/cache
│   └── icon.svg           # App icon (SVG)
└── README.md
```

## Setup and run

1) Create a virtual environment
```bash
python3 -m venv venv
source venv/bin/activate  # macOS/Linux
```

2) Install dependencies
```bash
pip install -r requirements.txt
```

3) Start the app
```bash
python app.py
```

4) Open in browser: http://localhost:8080

## How to use

1. Pick an operation (Addition, Subtraction, Multiplication, Division)
2. Choose difficulty (Easy / Medium / Hard)
3. Solve 10 problems. Type the answer and press “Check” (Enter key works too)
4. Watch progress with the progress bar
5. Summary shows how many were solved on the first try, and which were not

## Features

- 10 generated problems per run
- No reveal of the correct answer on mistakes; retry encouraged
- First-try tracking and final summary
- Modern responsive UI (glassmorphism, animations)
- PWA support (installable, offline cache)

## Icon

The project uses an SVG icon (`static/icon.svg`). To replace it:
1. Create a new SVG
2. Replace `static/icon.svg`
3. Update `static/manifest.json` if you rename the file

Helpful tools: Figma, Canva, SVGRepo

## Tech stack

- **Backend**: Flask (Python)
- **Frontend**: HTML5, CSS, JavaScript
- **PWA**: Service Worker, Web App Manifest
- **UI**: CSS Grid/Flexbox, gradients, animations
