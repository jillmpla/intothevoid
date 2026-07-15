export type VoidStatus =
  | "STABLE"
  | "FADING"
  | "DRIFTING"
  | "DESCENDING"
  | "LOST TO THE VOID";

export interface ColumnProfile {
  name: string;
  dtype: string;
  missing_count: number;
  missing_percent: number;
  present_count: number;
  longest_missing_streak: number;
  first_missing_row: number | null;
}

export interface HeatmapCell {
  row: number;
  column: string;
  missing: boolean;
}

export interface AnalysisResult {
  filename: string;
  rows: number;
  columns: number;
  total_cells: number;
  missing_cells: number;
  overall_missing_percent: number;
  status: VoidStatus;
  column_profiles: ColumnProfile[];
  heatmap_columns: string[];
  heatmap_rows: number[];
  heatmap: HeatmapCell[];
}
