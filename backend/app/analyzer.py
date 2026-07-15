from __future__ import annotations

from io import BytesIO

import pandas as pd

from .models import AnalysisResponse, ColumnProfile, HeatmapCell, VoidStatus

# Keep the heatmap small enough to stay readable in the interface.
MAX_HEATMAP_ROWS = 40
MAX_HEATMAP_COLUMNS = 12


def void_status(percent: float) -> VoidStatus:
    """Turn the overall missing-data percentage into a user-friendly status."""

    if percent < 5:
        return "STABLE"

    if percent < 15:
        return "FADING"

    if percent < 30:
        return "DRIFTING"

    if percent < 50:
        return "DESCENDING"

    return "LOST TO THE VOID"


def longest_true_streak(values: list[bool]) -> int:
    """Find the longest uninterrupted run of missing values."""

    longest = 0
    current = 0

    for value in values:
        if value:
            current += 1
            longest = max(longest, current)
        else:
            # Reset the count as soon as a present value appears.
            current = 0

    return longest


def analyze_csv(content: bytes, filename: str) -> AnalysisResponse:
    """Analyze a CSV file and return missing-data details for the frontend."""

    try:
        # Read the uploaded file directly from memory instead of saving it.
        dataframe = pd.read_csv(
            BytesIO(content),
            keep_default_na=True,
            na_values=[
                "",
                " ",
                "NULL",
                "null",
                "None",
                "none",
                "N/A",
                "n/a",
            ],
        )
    except UnicodeDecodeError as error:
        raise ValueError(
            "This CSV is not encoded as readable UTF-8 text."
        ) from error
    except pd.errors.EmptyDataError as error:
        raise ValueError("This CSV is empty.") from error
    except pd.errors.ParserError as error:
        raise ValueError(
            "This CSV could not be parsed. Check its rows and delimiters."
        ) from error

    # Stop early if pandas could not find any columns.
    if dataframe.columns.empty:
        raise ValueError("This CSV does not contain any columns.")

    # Gather the main dataset totals.
    rows, columns = dataframe.shape
    total_cells = rows * columns

    # Create a True/False map showing which cells are missing.
    missing_mask = dataframe.isna()

    missing_cells = int(missing_mask.sum().sum())

    overall_missing_percent = (
        round((missing_cells / total_cells) * 100, 2)
        if total_cells
        else 0.0
    )

    column_profiles: list[ColumnProfile] = []

    # Build a detailed profile for each column in the dataset.
    for column in dataframe.columns:
        mask = missing_mask[column].tolist()
        missing_count = int(sum(mask))

        # Row numbers are shown starting at 1 so they make sense to the user.
        first_missing_index = next(
            (
                index + 1
                for index, is_missing in enumerate(mask)
                if is_missing
            ),
            None,
        )

        column_profiles.append(
            ColumnProfile(
                name=str(column),
                dtype=str(dataframe[column].dtype),
                missing_count=missing_count,
                missing_percent=round(
                    (missing_count / rows) * 100 if rows else 0.0,
                    2,
                ),
                present_count=rows - missing_count,
                longest_missing_streak=longest_true_streak(mask),
                first_missing_row=first_missing_index,
            )
        )

    # Show the most incomplete columns first in the Event Horizon list.
    column_profiles.sort(
        key=lambda profile: (
            -profile.missing_percent,
            profile.name.lower(),
        )
    )

    # Limit the heatmap to the highest-ranked columns and first group of rows.
    ranked_names = [profile.name for profile in column_profiles]
    heatmap_columns = ranked_names[:MAX_HEATMAP_COLUMNS]

    heatmap_row_indexes = list(
        range(min(rows, MAX_HEATMAP_ROWS))
    )

    heatmap_rows = [
        index + 1 for index in heatmap_row_indexes
    ]

    heatmap: list[HeatmapCell] = []

    # Flatten the heatmap into cells that are easy for the frontend to render.
    for index in heatmap_row_indexes:
        for column in heatmap_columns:
            heatmap.append(
                HeatmapCell(
                    row=index + 1,
                    column=column,
                    missing=bool(
                        missing_mask.loc[index, column]
                    ),
                )
            )

    # Return one structured response that matches the frontend TypeScript types.
    return AnalysisResponse(
        filename=filename,
        rows=rows,
        columns=columns,
        total_cells=total_cells,
        missing_cells=missing_cells,
        overall_missing_percent=overall_missing_percent,
        status=void_status(overall_missing_percent),
        column_profiles=column_profiles,
        heatmap_columns=heatmap_columns,
        heatmap_rows=heatmap_rows,
        heatmap=heatmap,
    )

