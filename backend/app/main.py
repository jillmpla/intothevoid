import os

from fastapi import FastAPI, File, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware

from .analyzer import analyze_csv
from .models import AnalysisResponse

# Limit uploads to 10 MB so the first version stays lightweight.
MAX_FILE_SIZE = 10 * 1024 * 1024

# Read the deployed frontend address environment variable.
frontend_url = os.getenv("FRONTEND_URL")

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

# Add the production frontend URL when configured.
if frontend_url:
    allowed_origins.append(frontend_url)

app = FastAPI(
    title="Into the Void API",
    description="Analyze missing values in CSV datasets.",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=False,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)


@app.get("/api/health")
def health_check() -> dict[str, str]:
    """Provide a simple way to confirm that the API is running."""

    return {"status": "ok"}


@app.post("/api/analyze", response_model=AnalysisResponse)
async def analyze(file: UploadFile = File(...)) -> AnalysisResponse:
    """Validate an uploaded CSV and return its missing-data analysis."""

    # Use a safe fallback name if the uploaded file does not include one.
    filename = file.filename or "uploaded.csv"

    # This first version only accepts CSV files.
    if not filename.lower().endswith(".csv"):
        raise HTTPException(
            status_code=400,
            detail="Choose a CSV file.",
        )

    # Read one extra byte so we can detect files that exceed the limit.
    content = await file.read(MAX_FILE_SIZE + 1)

    # Close the uploaded file once its contents are in memory.
    await file.close()

    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(
            status_code=413,
            detail="Choose a CSV file smaller than 10 MB.",
        )

    if not content:
        raise HTTPException(
            status_code=400,
            detail="This CSV is empty.",
        )

    try:
        # Pass the file contents to the analyzer and return the finished report.
        return analyze_csv(content, filename)

    except ValueError as error:
        # Validation and parsing problems are returned as user-friendly errors.
        raise HTTPException(
            status_code=400,
            detail=str(error),
        ) from error

    except Exception as error:
        # Avoid exposing unexpected internal details to the frontend.
        raise HTTPException(
            status_code=500,
            detail="The file could not be analyzed.",
        ) from error
