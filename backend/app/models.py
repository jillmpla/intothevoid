from typing import Literal

from pydantic import BaseModel


# Limit the status field to the five labels used by the app.
VoidStatus = Literal[
    "STABLE",
    "FADING",
    "DRIFTING",
    "DESCENDING",
    "LOST TO THE VOID",
]


class ColumnProfile(BaseModel):
    """Stores the missing-data details for one CSV column."""

    name: str
    dtype: str
    missing_count: int
    missing_percent: float
    present_count: int
    longest_missing_streak: int
    first_missing_row: int | None


class HeatmapCell(BaseModel):
    """Represents one cell in the missingness map."""

    row: int
    column: str
    missing: bool


class AnalysisResponse(BaseModel):
    """Defines the complete analysis returned to the React frontend."""

    # Basic information about the uploaded dataset.
    filename: str
    rows: int
    columns: int
    total_cells: int

    # Overall missing-data totals and status.
    missing_cells: int
    overall_missing_percent: float
    status: VoidStatus

    # Detailed column information used by the Event Horizon and Column Autopsy.
    column_profiles: list[ColumnProfile]

    # A smaller sample of the dataset used to build the missingness map.
    heatmap_columns: list[str]
    heatmap_rows: list[int]
    heatmap: list[HeatmapCell]

