import { useRef, useState } from "react";
import {
  AlertCircle,
  ArrowUp,
  CheckCircle2,
  FileSearch,
  Orbit,
  RotateCcw,
  Sparkles,
  Upload,
} from "lucide-react";
import { analyzeCsv } from "./api";
import type { AnalysisResult, ColumnProfile } from "./types";
import Footer from "./Footer";

// Keep uploads small for this first version of the app.
const MAX_FILE_BYTES = 10 * 1024 * 1024;

// Makes larger numbers easier to read in the dashboard.
function formatNumber(value: number) {
  return new Intl.NumberFormat().format(value);
}

// Turns a status like "LOST TO THE VOID" into a CSS-friendly class name.
function statusClass(status: AnalysisResult["status"]) {
  return status.toLowerCase().replaceAll(" ", "-");
}

// Gives each themed status a plain-language explanation for the tooltip.
function statusDescription(status: AnalysisResult["status"]) {
  switch (status) {
    case "STABLE":
      return "Less than 5% of the dataset is missing.";
    case "FADING":
      return "Between 5% and 15% of the dataset is missing.";
    case "DRIFTING":
      return "Between 15% and 30% of the dataset is missing.";
    case "DESCENDING":
      return "Between 30% and 50% of the dataset is missing.";
    case "LOST TO THE VOID":
      return "At least 50% of the dataset is missing.";
  }
}

function App() {
  // Store the scan results, selected column, upload state, and any errors here.
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [selectedColumn, setSelectedColumn] =
    useState<ColumnProfile | null>(null);
  const [fileName, setFileName] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // Tracks whether the status explanation is visible for mouse, keyboard, or touch users.
  const [showStatusHelp, setShowStatusHelp] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // This points to the results section so we can move keyboard focus there after a scan.
  const resultsRef = useRef<HTMLElement | null>(null);

  // Validate the CSV first, then send it to the FastAPI backend for analysis.
  async function handleFile(file?: File) {
    if (!file) return;

    setError("");

    if (!file.name.toLowerCase().endsWith(".csv")) {
      setError("Choose a CSV file.");
      return;
    }

    if (file.size > MAX_FILE_BYTES) {
      setError("Choose a CSV file smaller than 10 MB.");
      return;
    }

    setFileName(file.name);
    setIsLoading(true);

    try {
      // The backend returns the dataset summary, column profiles, and heatmap data.
      const result = await analyzeCsv(file);

      setAnalysis(result);
      setSelectedColumn(result.column_profiles[0] ?? null);

      // Move focus to the report so keyboard and screen-reader users know the scan finished.
      window.setTimeout(() => resultsRef.current?.focus(), 50);
    } catch (caughtError) {
      setAnalysis(null);
      setSelectedColumn(null);

      setError(
        caughtError instanceof Error
          ? caughtError.message
          : "The file could not be analyzed.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  // Clear the current report and return the user to a fresh upload state.
  function reset() {
    setAnalysis(null);
    setSelectedColumn(null);
    setFileName("");
    setError("");
    setShowStatusHelp(false);

    if (inputRef.current) {
      inputRef.current.value = "";
    }

    inputRef.current?.focus();
  }

  return (
    <div className="app-shell">
      {/* Decorative background only, so assistive technology can ignore it. */}
      <div className="space-noise" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="/" aria-label="Into the Void home">
          <span className="brand-mark" aria-hidden="true">
            <Orbit size={22} />
          </span>

          <span>Into the Void</span>
        </a>

        {analysis && (
          <button className="text-button" type="button" onClick={reset}>
            <RotateCcw size={16} aria-hidden="true" />
            New scan
          </button>
        )}
      </header>

      <main id="main-content">
        {/* Show the upload screen until we have a completed analysis. */}
        {!analysis ? (
          <section className="hero" aria-labelledby="hero-title">
            <div className="eyebrow">
              <Sparkles size={15} aria-hidden="true" />
              Missing data explorer
            </div>

            <h1 id="hero-title">
              Find what slipped
              <span> into the void.</span>
            </h1>

            <p className="hero-copy">
              Upload a CSV to uncover missing values, affected columns, and
              patterns across your dataset.
            </p>

            <div
              className={`upload-panel ${isDragging ? "is-dragging" : ""}`}
              onDragEnter={(event) => {
                event.preventDefault();
                setIsDragging(true);
              }}
              onDragOver={(event) => {
                event.preventDefault();
              }}
              onDragLeave={(event) => {
                if (event.currentTarget === event.target) {
                  setIsDragging(false);
                }
              }}
              onDrop={(event) => {
                event.preventDefault();
                setIsDragging(false);

                void handleFile(event.dataTransfer.files[0]);
              }}
            >
              <div className="upload-orbit" aria-hidden="true">
                <div className="orbit-ring" />
                <Upload size={30} />
              </div>

              <h2>
                {isLoading ? "Scanning the void…" : "Drop your CSV here"}
              </h2>

              <p>or choose a file from your device</p>

              <label className="primary-button" htmlFor="csv-upload">
                <FileSearch size={18} aria-hidden="true" />
                {isLoading ? "Analyzing…" : "Choose CSV"}
              </label>

              <input
                ref={inputRef}
                className="visually-hidden"
                id="csv-upload"
                type="file"
                accept=".csv,text/csv"
                disabled={isLoading}
                onChange={(event) =>
                  void handleFile(event.target.files?.[0])
                }
              />

              <span className="upload-note">
                CSV only · 10 MB maximum
              </span>

              {fileName && isLoading && (
                <span className="file-in-progress">{fileName}</span>
              )}
            </div>

            {error && (
              <div className="error-message" role="alert">
                <AlertCircle size={18} aria-hidden="true" />
                {error}
              </div>
            )}

            <div className="privacy-note">
              <CheckCircle2 size={17} aria-hidden="true" />
              Processed temporarily. Nothing is saved.
            </div>
          </section>
        ) : (
          <section
            className="results"
            aria-labelledby="results-title"
            ref={resultsRef}
            tabIndex={-1}
          >
            <div className="results-heading">
              <div>
                <div className="eyebrow">
                  <Orbit size={15} aria-hidden="true" />
                  Void report
                </div>

                <h1 id="results-title">{analysis.filename}</h1>

                <p>
                  {formatNumber(analysis.rows)} rows ·{" "}
                  {formatNumber(analysis.columns)} columns
                </p>
              </div>

              {/* The status can be hovered, focused, or clicked to explain what it means. */}
              <div className="status-wrapper">
                <button
                  className={`status-pill ${statusClass(analysis.status)}`}
                  type="button"
                  aria-label={`Dataset status: ${analysis.status}`}
                  aria-describedby="status-help"
                  aria-expanded={showStatusHelp}
                  onMouseEnter={() => setShowStatusHelp(true)}
                  onMouseLeave={() => setShowStatusHelp(false)}
                  onFocus={() => setShowStatusHelp(true)}
                  onBlur={() => setShowStatusHelp(false)}
                  onClick={() =>
                    setShowStatusHelp((current) => !current)
                  }
                >
                  <span aria-hidden="true" />
                  {analysis.status}
                </button>

                <div
                  id="status-help"
                  className={`status-tooltip ${
                    showStatusHelp ? "visible" : ""
                  }`}
                  role="tooltip"
                >
                  {statusDescription(analysis.status)}
                </div>
              </div>
            </div>

            {/* Quick summary cards give the user the main findings first. */}
            <section
              className="metric-grid"
              aria-label="Dataset summary"
            >
              <article className="metric-card primary-metric">
                <span>Void depth</span>

                <strong>
                  {analysis.overall_missing_percent.toFixed(1)}%
                </strong>

                <div
                  className="meter"
                  role="progressbar"
                  aria-label="Overall missing data"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={analysis.overall_missing_percent}
                >
                  <span
                    style={{
                      width: `${Math.min(
                        analysis.overall_missing_percent,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </article>

              <article className="metric-card">
                <span>Missing values</span>

                <strong>
                  {formatNumber(analysis.missing_cells)}
                </strong>

                <small>
                  of {formatNumber(analysis.total_cells)} cells
                </small>
              </article>

              <article className="metric-card">
                <span>Affected columns</span>

                <strong>
                  {
                    analysis.column_profiles.filter(
                      (column) => column.missing_count > 0,
                    ).length
                  }
                </strong>

                <small>contain at least one gap</small>
              </article>
            </section>

            {/* The main dashboard pairs the column ranking with details for the selected field. */}
            <div className="dashboard-grid">
              <section
                className="panel event-horizon"
                aria-labelledby="event-horizon-title"
              >
                <div className="panel-heading">
                  <div>
                    <span className="panel-kicker">
                      Column ranking
                    </span>

                    <h2 id="event-horizon-title">
                      The Event Horizon
                    </h2>
                  </div>

                  <ArrowUp
                    size={18}
                    aria-label="Sorted highest first"
                  />
                </div>

                <div className="column-list">
                  {analysis.column_profiles.map((column) => (
                    <button
                      className={`column-row ${
                        selectedColumn?.name === column.name
                          ? "active"
                          : ""
                      }`}
                      type="button"
                      key={column.name}
                      onClick={() => setSelectedColumn(column)}
                      aria-pressed={
                        selectedColumn?.name === column.name
                      }
                    >
                      <span className="column-name">
                        {column.name}
                      </span>

                      <span
                        className="column-bar"
                        aria-hidden="true"
                      >
                        <span
                          style={{
                            width: `${column.missing_percent}%`,
                          }}
                        />
                      </span>

                      <span className="column-percent">
                        {column.missing_percent.toFixed(1)}%
                      </span>
                    </button>
                  ))}
                </div>
              </section>

              <section
                className="panel autopsy"
                aria-labelledby="column-autopsy-title"
              >
                <div className="panel-heading">
                  <div>
                    <span className="panel-kicker">
                      Selected field
                    </span>

                    <h2 id="column-autopsy-title">
                      Column Autopsy
                    </h2>
                  </div>
                </div>

                {selectedColumn && (
                  <div className="autopsy-content">
                    <div className="selected-column-name">
                      {selectedColumn.name}
                    </div>

                    <span className="data-type">
                      {selectedColumn.dtype}
                    </span>

                    <dl className="detail-list">
                      <div>
                        <dt>Missing</dt>

                        <dd>
                          {formatNumber(
                            selectedColumn.missing_count,
                          )}{" "}
                          <span>
                            (
                            {selectedColumn.missing_percent.toFixed(
                              1,
                            )}
                            %)
                          </span>
                        </dd>
                      </div>

                      <div>
                        <dt>Present</dt>

                        <dd>
                          {formatNumber(
                            selectedColumn.present_count,
                          )}
                        </dd>
                      </div>

                      <div>
                        <dt>First gap</dt>

                        <dd>
                          {selectedColumn.first_missing_row === null
                            ? "None"
                            : `Row ${selectedColumn.first_missing_row}`}
                        </dd>
                      </div>

                      <div>
                        <dt>Longest streak</dt>

                        <dd>
                          {formatNumber(
                            selectedColumn.longest_missing_streak,
                          )}{" "}
                          rows
                        </dd>
                      </div>
                    </dl>
                  </div>
                )}
              </section>
            </div>

            {/* A compact visual sample shows where missing values appear in the dataset. */}
            <section
              className="panel map-panel"
              aria-labelledby="map-title"
            >
              <div className="panel-heading">
                <div>
                  <span className="panel-kicker">
                    Sample view
                  </span>

                  <h2 id="map-title">Where Data Is Missing</h2>
                </div>

                <div className="map-legend" aria-hidden="true">
                  <span className="present-key" />
                  Present

                  <span className="missing-key" />
                  Missing
                </div>
              </div>

              <p className="sr-summary">
                The map samples {analysis.heatmap_rows.length} rows
                and {analysis.heatmap_columns.length} columns. Bright
                cells indicate missing values.
              </p>

              <div className="heatmap-scroll" tabIndex={0}>
                <div
                  className="heatmap"
                  style={{
                    gridTemplateColumns: `minmax(72px, auto) repeat(${analysis.heatmap_columns.length}, minmax(36px, 1fr))`,
                  }}
                  role="table"
                  aria-label="Where Data Is Missing"
                >
                  <div
                    className="heatmap-corner"
                    role="columnheader"
                  >
                    Row
                  </div>

                  {analysis.heatmap_columns.map((column) => (
                    <div
                      className="heatmap-column"
                      role="columnheader"
                      key={column}
                      title={column}
                    >
                      {column}
                    </div>
                  ))}

                  {analysis.heatmap_rows.flatMap((row) => [
                    <div
                      className="heatmap-row-label"
                      role="rowheader"
                      key={`r-${row}`}
                    >
                      {row}
                    </div>,

                    ...analysis.heatmap_columns.map((column) => {
                      const cell = analysis.heatmap.find(
                        (item) =>
                          item.row === row &&
                          item.column === column,
                      );

                      return (
                        <div
                          className={`heatmap-cell ${
                            cell?.missing
                              ? "missing"
                              : "present"
                          }`}
                          role="cell"
                          aria-label={`Row ${row}, ${column}: ${
                            cell?.missing
                              ? "missing"
                              : "present"
                          }`}
                          key={`${row}-${column}`}
                        />
                      );
                    }),
                  ])}
                </div>
              </div>
            </section>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;
