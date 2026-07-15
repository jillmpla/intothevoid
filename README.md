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
│   ├── package.json
│   └── vercel.json
├── backend/
│   ├── app/
│   │   ├── analyzer.py
│   │   ├── main.py
│   │   └── models.py
│   ├── tests/
│   │   └── test_analyzer.py
│   ├── index.py
│   └── requirements.txt
├── sample-data/
│   └── stellar_customers.csv
├── LICENSE
└── README.md
```

### Frontend

- **`frontend/src/App.tsx`** - Contains the CSV upload experience and missing-data dashboard.
- **`frontend/src/About.tsx`** - Provides information about the project and its creator.
- **`frontend/src/Privacy.tsx`** - Explains how uploaded files are handled.
- **`frontend/src/Footer.tsx`** - Creates the shared footer and navigation.
- **`frontend/src/api.ts`** - Sends CSV files to the backend for analysis.
- **`frontend/src/main.tsx`** - Starts the app and defines its routes.
- **`frontend/src/styles.css`** - Contains the responsive, accessible, space-themed design.
- **`frontend/src/types.ts`** - Defines the TypeScript types used by the frontend.
- **`frontend/package.json`** - Lists frontend dependencies and scripts.
- **`frontend/vercel.json`** - Configures Vercel routing for the React app.

### Backend

- **`backend/app/main.py`** - Creates the FastAPI application and upload endpoint.
- **`backend/app/analyzer.py`** - Analyzes missing values and builds the report data.
- **`backend/app/models.py`** - Defines the API response models.
- **`backend/tests/test_analyzer.py`** - Tests the core analysis logic.
- **`backend/index.py`** - Exposes the FastAPI app for Vercel.
- **`backend/requirements.txt`** - Lists the backend Python dependencies.

### Sample Data

- **`sample-data/stellar_customers.csv`** - A fictional CSV with intentional gaps for testing.

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
