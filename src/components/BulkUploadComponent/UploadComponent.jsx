import React, { Component } from "react";
import { isCSV } from "../utils/utility";
import { postUpload } from "@/api/mockApi";

export class UploadComponent extends Component {
    fileInputRef = React.createRef();

    state = { error: "" };

    handleFileChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        
        if (!isCSV(file, file.type)) {
            this.setState({ error: "Please upload a CSV file (.csv or valid CSV MIME type)." });
            e.target.value = "";
            return;
        }

        this.setState({ error: "" });

        const details = {
            name: file.name,
            size: file.size,
            type: file.type,
            lastModified: file.lastModified,
            lastModifiedDate: file.lastModifiedDate?.toISOString?.(),
        };
        console.log("Uploaded file details:", details);

        const reader = new FileReader();
        reader.onload = (event) => {
            const text = event.target?.result ?? "";
            const arrayOfObjects = this.parseToArrayOfObjects(text, file.name);
            console.log("File data (array of objects):", arrayOfObjects);

            postUpload({ fileName: file.name, data: arrayOfObjects })
                .then((response) => {
                    console.log("API response:", response);
                })
                .catch((err) => {
                    console.error("API error:", err);
                });
        };
        reader.onerror = () => console.error("Failed to read file:", file.name);
        reader.readAsText(file);
    };

    /**
     * Parses raw file text (e.g. CSV) into an array of objects.
     * First line is treated as headers; each following line becomes one object with those keys.
     *
     * @param {string} text - Raw file content as a single string (e.g. "Name,Age\nJohn,30\nJane,25").
     * @param {string} [fileName=""] - File name (reserved for future use, e.g. JSON vs CSV detection).
     * @returns {Array<Record<string, string>>} Array of objects, one per data row.
     */
    parseToArrayOfObjects = (text) => {
        // Remove leading/trailing whitespace so empty files and stray newlines don't break parsing.
        const trimmed = text.trim();
        // Return empty array if file is empty or only whitespace.
        if (!trimmed) return [];

        // Split text into rows by newline, then split each row by comma; trim each cell value.
        // Example: "a,b\n1,2" → [["a","b"], ["1","2"]]
        const rows = trimmed
            .split("\n")
            .map((row) => row.split(",").map((cell) => cell.trim()));
        // First row holds the property names (column headers) for every object.
        const headers = rows[0] ?? [];
        // Remaining rows are the data; each row will become one object.
        const dataRows = rows.slice(1);

        // Build one object per data row: keys from headers, values from the row at same index.
        // Missing values default to "" so every header key exists on each object.
        return dataRows.map((row, index) => ({
            rowNumber: index + 1,
            dateImplemented: row[0],
            subCompanyName: row[1],
            subCompanyId: row[2],
            documentName: row[3],
        }));

        
    };

    render() {
        const { error } = this.state;
        return (
            <div>
                <input
                    ref={this.fileInputRef}
                    type="file"
                    onChange={this.handleFileChange}
                />
                {error && (
                    <div style={{ color: "red", marginTop: 8 }}>{error}</div>
                )}
            </div>
        );
    }
}

export default UploadComponent;
