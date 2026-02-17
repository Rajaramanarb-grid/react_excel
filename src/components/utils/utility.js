/**
 * CSV MIME types (RFC 4180 registers text/csv; application/csv is sometimes used).
 */
const CSV_MIME_TYPES = [
    "text/csv",
    "application/csv",
];

/**
 * Checks if the given input is a CSV file by extension and/or MIME type.
 *
 * @param {File|string} fileOrFileName - A File instance (uses file.name and file.type) or a file name string (e.g. "data.csv").
 * @param {string} [mimeType] - Optional MIME type when first argument is a file name string (e.g. "text/csv").
 * @returns {boolean} True if the file appears to be CSV by extension or MIME type.
 *
 * @example
 * isCSV(myFile);                    // File object: checks file.name and file.type
 * isCSV("export.csv");              // File name only: checks .csv extension
 * isCSV("data.csv", "text/csv");    // File name + MIME type
 */
export function isCSV(fileOrFileName, mimeType) {
    let fileName;
    let type;

    if (fileOrFileName instanceof File) {
        fileName = fileOrFileName.name;
        type = fileOrFileName.type;
    } else if (typeof fileOrFileName === "string") {
        fileName = fileOrFileName;
        type = mimeType;
    } else {
        return false;
    }

    const hasCsvExtension =
        typeof fileName === "string" &&
        fileName.toLowerCase().endsWith(".csv");

    const hasCsvMimeType =
        typeof type === "string" &&
        CSV_MIME_TYPES.includes(type.toLowerCase().trim());

    return hasCsvExtension || hasCsvMimeType;
}
