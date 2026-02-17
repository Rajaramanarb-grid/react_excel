import React, { Component } from "react";
import blueIcon from "../../assets/download-blue.svg";
import redIcon from "../../assets/download-red.svg";
import "./CustomFileInput.scss";
import { isCSV } from "../utils/utility";

/**
 * Custom file upload UI: text input (shows chosen file name), "CHOOSE" button that opens
 * the native file picker, optional template/instructions download links, and a Submit button.
 * The actual <input type="file"> is hidden and triggered by the CHOOSE button.
 */
export class CustomFileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "", // Display name of the currently selected file (shown in the text input).
            errorMes: "", // Error message to show below the input (e.g. validation errors).
            headers: [], // Parsed headers from the CSV file (for potential future use).
            data: [], // Parsed data rows from the CSV file (for potential future use).
        };
        // Ref to the hidden file input so we can programmatically trigger a click.
        this.fileRef = React.createRef();

        this.HEADERS = [
            "Date Implemented",
            "SubCompany Name",
            "SubCompany ID",
            "Document Name",
        ];
    }

    /** Programmatically opens the native file picker by clicking the hidden file input. */
    handleButtonClick = () => {
        this.fileRef.current.click();
    };

    /**
     * Runs when the user selects a file. Updates displayed file name and notifies parent via onChange.
     * @param {React.ChangeEvent<HTMLInputElement>} e - Change event from the file input.
     */
    handleFileChange = (e) => {
        this.setState({ fileName: "", errorMes: "" }); // Clear previous file name and errors when a new file is selected.
        const file = e.target.files[0];
        if (!file) return;

        if (!isCSV(file, file.type)) {
            this.setState({
                errorMes: "Please upload a CSV file",
            });
            e.target.value = "";
            return;
        }

        const reader = new FileReader();
        reader.onload = async (event) => {
            const text = event.target.result;

            const rows = text
                .trim()
                .split("\n")
                .map((row) => row.split(","));

            const originalHeaders = rows[0].map((h) => h.trim());

            const isValidHeaders =
                originalHeaders.length === this.HEADERS.length &&
                originalHeaders.every(
                    (header, index) =>
                        header.toLowerCase() ===
                        this.HEADERS[index].toLowerCase(),
                );

            if (!isValidHeaders) {
                this.setState({ errorMes: "Invalid CSV Header" });
                return;
            } else {
                const csvData = rows.slice(1);
                const trimmedData = csvData.map((row) =>
                    row.map((cell) => cell.trim()),
                );
                this.setState({
                    fileName: file.name,
                    headers: originalHeaders,
                    data: trimmedData,
                });
            }
        };
        reader.readAsText(file);
    };

    handleSubmit = (e) => {
        e.preventDefault();

        const { data } = this.state;
        // Guad class for validation
        if(!data?.length) return;

        const formattedData = data.map((row, index) => ({
            rowNumber: index + 1,
            dateImplemented: row[0],
            subCompanyName: row[1],
            subCompanyID: row[2],
            documentName: row[3],
        }));

        console.log(formattedData);
    };

    /**
     * Renders the optional download links block (template + instructions).
     * Replace empty href="" with real URLs when templates/instructions are available.
     */
    additionalLinkInformation = () => {
        return (
            <div className="file-upload__downloads">
                <div className="file-upload__download-item">
                    <img
                        src={redIcon}
                        alt="download icon"
                        className="file-upload__download-icon"
                    />
                    <a
                        href=""
                        className="file-upload__download-link file-upload__download-link--template"
                    >
                        DOWNLOAD TEMPLATE
                    </a>
                </div>
                <div className="file-upload__download-item">
                    <img
                        src={blueIcon}
                        alt="download icon"
                        className="file-upload__download-icon"
                    />
                    <a
                        href=""
                        className="file-upload__download-link file-upload__download-link--instructions"
                    >
                        DOWNLOAD INSTRUCTIONS
                    </a>
                </div>
            </div>
        );
    };

    render() {
        const { fileName, errorMes } = this.state;

        return (
            <form className="file-upload" onSubmit={this.handleSubmit}>
                {/* Text input shows selected file name; read-only so user must use CHOOSE to pick a file. */}
                <div className="file-upload__input-wrapper">
                    <input
                        type="text"
                        value={fileName}
                        placeholder="Upload"
                        readOnly
                        className="file-upload__input"
                    />

                    <button
                        type="button"
                        className="file-upload__button"
                        onClick={this.handleButtonClick}
                    >
                        CHOOSE
                    </button>

                    {/* Hidden file input: styled to be invisible; opened via ref when CHOOSE is clicked. */}
                    <input
                        type="file"
                        ref={this.fileRef}
                        onChange={this.handleFileChange}
                        className="file-upload__file-input"
                    />
                </div>

                {errorMes && (
                    <div className="file-upload__error">{errorMes}</div>
                )}

                {this.additionalLinkInformation()}

                <div className="file-upload__divider"></div>

                <div className="file-upload__actions">
                    <button
                        className="file-upload__action-button"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        );
    }
}

export default CustomFileInput;
