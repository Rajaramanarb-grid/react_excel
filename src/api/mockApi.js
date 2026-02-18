/**
 * Mock API path. Served by Vite dev server at /api/upload (see vite.config.js).
 * In production, replace with your real API base URL.
 */
export const MOCK_API_URL = "/api/upload";

/**
 * POSTs the upload payload to the mock API.
 *
 * @param {{ fileName?: string, data?: unknown }} payload - Object to send (e.g. { fileName, data: arrayOfObjects }).
 * @returns {Promise<Record<string, unknown>>} Parsed JSON response from the mock API.
 */
export async function validate(payload) {
    const response = await fetch(MOCK_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
    });

    if (!response.ok) {
        throw new Error(`Mock API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
}
