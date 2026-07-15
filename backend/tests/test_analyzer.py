from app.analyzer import analyze_csv, longest_true_streak, void_status


def test_void_status_thresholds() -> None:
    """Check that each missing-data range returns the correct status."""

    assert void_status(0) == "STABLE"
    assert void_status(5) == "FADING"
    assert void_status(15) == "DRIFTING"
    assert void_status(30) == "DESCENDING"
    assert void_status(50) == "LOST TO THE VOID"


def test_longest_true_streak() -> None:
    """Make sure consecutive missing values are counted correctly."""

    # The longest run of True values in this list is two.
    assert longest_true_streak(
        [False, True, True, False, True]
    ) == 2

    # An empty list should return a streak length of zero.
    assert longest_true_streak([]) == 0


def test_csv_analysis() -> None:
    """Check the main CSV analysis using a small sample dataset."""

    # This sample has three rows, three columns, and two missing values.
    content = (
        b"name,email,age\n"
        b"Nova,nova@example.com,32\n"
        b"Orion,,41\n"
        b"Lyra,lyra@example.com,\n"
    )

    # Run the same analysis used by the API.
    result = analyze_csv(content, "test.csv")

    # Confirm that the dataset totals are calculated correctly.
    assert result.rows == 3
    assert result.columns == 3
    assert result.missing_cells == 2

    # The most incomplete columns should each be missing one out of three values.
    assert result.column_profiles[0].missing_percent == 33.33

