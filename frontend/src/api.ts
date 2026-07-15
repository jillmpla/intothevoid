import type { AnalysisResult } from "./types";

// Use the environment variable when one is provided.
// Otherwise, connect to the local FastAPI server during development.
const API_URL =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000";

// Sends the selected CSV file to the backend and returns the analysis results.
export async function analyzeCsv(file: File): Promise<AnalysisResult> {
  // FormData lets us send the file as a multipart upload.
  const formData = new FormData();
  formData.append("file", file);

  // Send the CSV to the backend analysis endpoint.
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    body: formData,
  });

  // Try to show the more specific error message returned by the backend.
  if (!response.ok) {
    let message = "The file could not be analyzed.";

    try {
      const data = (await response.json()) as { detail?: string };

      if (data.detail) {
        message = data.detail;
      }
    } catch {
      // Keep the fallback message if the response is not valid JSON.
    }

    throw new Error(message);
  }

  // Convert the successful JSON response into the expected result type.
  return response.json() as Promise<AnalysisResult>;
}
