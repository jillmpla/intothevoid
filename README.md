# 🌌 Into the Void

Into the Void is a small, accessible data-quality web app that analyzes missing values in CSV files. Upload a dataset to see its overall missingness, the columns most affected, and a compact visual map of where values disappear.

## 🚀 Live Demo

**Explore the void:** [intothevoid.website](http://www.intothevoid.website)

Try it with the included `sample-data/stellar_customers.csv` file to see the missing-data analysis in action.

## ✨ Features

- 📂 Drag-and-drop or keyboard-accessible CSV upload
- 🕳️ Overall **Void Depth** score and plain-language status
- 📊 Missing-value ranking for every column
- 🗺️ Accessible missingness map with a text alternative
- 🔎 Column-level details
- 🚫 No account or database required
- 🔒 Files are analyzed in memory and are not saved by the app

## Tech stack

- React + Vite
- TypeScript
- FastAPI
- pandas

## Project Structure

```text
into-the-void/
├── frontend/
│   ├── src/
│   │   ├── About.tsx
│   │   ├── App.tsx
│   │   ├── Footer.tsx
│   │   ├── Privacy.tsx
│   │   ├── api.ts
│   │   ├── main.tsx
│   │   ├── styles.css
│   │   └── types.ts
│   ├── .env.example
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── analyzer.py
│   │   ├── main.py
│   │   └── models.py
│   ├── tests/
│   │   └── test_analyzer.py
│   └── requirements.txt
├── sample-data/
│   └── stellar_customers.csv
├── .gitignore
├── LICENSE
└── README.md
```

### Frontend

- **`frontend/src/App.tsx`** — Contains the main React interface, including CSV upload, dataset summary cards, the Event Horizon ranking, Column Autopsy details, and the missingness map.
- **`frontend/src/About.tsx`** — Provides the About page with information about the project and its creator.
- **`frontend/src/Privacy.tsx`** — Explains how uploaded CSV files are processed and outlines the app’s privacy practices.
- **`frontend/src/Footer.tsx`** — Creates the shared footer with navigation links, branding, and an automatically updating copyright year.
- **`frontend/src/api.ts`** — Sends uploaded CSV files to the FastAPI backend and returns the analysis results.
- **`frontend/src/main.tsx`** — Starts the React application and defines the routes for the scanner, About page, and Privacy page.
- **`frontend/src/styles.css`** — Defines the responsive space-themed design, accessibility styles, layouts, focus states, footer, and information pages.
- **`frontend/src/types.ts`** — Defines the TypeScript types used for API responses, column profiles, status labels, and heatmap cells.
- **`frontend/.env.example`** — Shows how to configure the frontend API URL.
- **`frontend/index.html`** — Provides the base HTML page and root element used by React.
- **`frontend/package.json`** — Lists the frontend dependencies, project information, and available development scripts.
- **`frontend/vite.config.ts`** — Configures Vite and the React plugin.
- **`frontend/eslint.config.js`** — Defines the frontend linting and code-quality rules.
- **`frontend/tsconfig.json`** — Connects the frontend TypeScript configuration files.
- **`frontend/tsconfig.app.json`** — Defines TypeScript settings for the React application.
- **`frontend/tsconfig.node.json`** — Defines TypeScript settings for the Vite configuration.

### Backend

- **`backend/app/main.py`** — Creates the FastAPI application, configures CORS, validates uploaded files, and provides the API endpoints.
- **`backend/app/analyzer.py`** — Reads CSV files with pandas and calculates missing-value totals, percentages, column profiles, streaks, statuses, and heatmap data.
- **`backend/app/models.py`** — Defines the Pydantic models used to structure API responses.
- **`backend/app/__init__.py`** — Marks the `app` directory as a Python package.
- **`backend/tests/test_analyzer.py`** — Tests the status thresholds, missing-value streak calculations, and CSV analysis results.
- **`backend/requirements.txt`** — Lists the Python packages required to run and test the backend.

### Sample Data

- **`sample-data/stellar_customers.csv`** — A fictional customer dataset with intentional missing values for testing the application.

## Run locally

### 1. Start the backend

```bash
cd backend
python -m venv .venv
```

Activate the virtual environment:

**Windows PowerShell**

```powershell
.venv\Scripts\Activate.ps1
```

**macOS/Linux**

```bash
source .venv/bin/activate
```

Install dependencies and start the API:

```bash
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

### 2. Start the frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173`.

## Try the sample file

Upload:

```text
sample-data/stellar_customers.csv
```

## Accessibility

The interface includes:

- Visible keyboard focus
- Semantic headings, labels, buttons, and status regions
- High-contrast text and controls
- Reduced-motion support
- Color-independent status labels
- Screen-reader summaries for visual data
- A standard file input in addition to drag-and-drop

## Current MVP limits

- CSV files only
- Maximum upload size: 10 MB
- Missingness analysis only
- The heatmap displays a sample of up to 40 rows and 12 columns
