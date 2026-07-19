# 🌌 Into the Void

Into the Void is a small, accessible data-quality web app that analyzes missing values in CSV files. Upload a dataset to discover missing data, identify incomplete columns, and visualize where gaps appear throughout your dataset.

## 🚀 Live Demo

**Explore the void:** [https://www.intothevoid.website](https://www.intothevoid.website)

Try it with the included `sample-data/stellar_customers.csv` file to see the missing-data analysis in action.

## ✨ Features

- 📂 Drag-and-drop or keyboard-accessible CSV upload
- 🕳️ Overall **Void Depth** score and plain-language status
- 📊 Missing-value ranking for every column
- 🗺️ Accessible Where Data Is Missing map with a text alternative
- 🔎 Column-level details
- 🚫 No account or database required
- 🔒 Files are analyzed in memory and are not saved by the app

## Tech stack

- React + Vite
- TypeScript
- FastAPI
- pandas

## Main Project Structure

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

## Run Locally

Run the backend and frontend in two separate terminals.

### 1. Start the backend

From the project root, move into the backend folder and create a virtual environment:

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

Install the backend dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI server:

```bash
uvicorn app.main:app --reload --port 8000
```

Keep this terminal open while using the app.

The backend will run at:

```text
http://localhost:8000
```

You can test it by opening:

```text
http://localhost:8000/api/health
```

### 2. Start the frontend

Open a second terminal, return to the project root, and move into the frontend folder:

```bash
cd frontend
```

Install the frontend dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Keep this terminal open while using the app.

Open the local URL shown by Vite, usually:

```text
http://localhost:5173
```

> `npm install` usually only needs to be run the first time or whenever `package.json` changes. After that, you can start the frontend with `npm run dev`.

## 🫶 Accessibility

The interface includes:

- Visible keyboard focus
- Semantic headings, labels, buttons, and status regions
- High-contrast text and controls
- Reduced-motion support
- Color-independent status labels
- Screen-reader summaries for visual data
- A standard file input in addition to drag-and-drop

## 🚧 Current Limitations

- CSV files only
- Maximum upload size: 10 MB
- Where Data Is Missing analysis only
- The heatmap displays a sample of up to 40 rows and 12 columns

## 📄 License

See [`LICENSE.txt`](./LICENSE.txt) for the full license terms.

---

## ⭐ Support the Project

If you find **Into the Void** useful, consider giving the repository a star.