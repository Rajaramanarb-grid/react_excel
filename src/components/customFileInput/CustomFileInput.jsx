import React, { Component } from "react";
import blueIcon from "../../assets/download-blue.svg";
import redIcon from "../../assets/download-red.svg";
import "./CustomFileInput.scss";

/**
 * Custom file upload UI: text input (shows chosen file name), "CHOOSE" button that opens
 * the native file picker, optional template/instructions download links, and a Submit button.
 * The actual <input type="file"> is hidden and triggered by the CHOOSE button.
 */
export class CustomFileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",   // Display name of the currently selected file (shown in the text input).
            errorMes: "",   // Error message to show below the input (e.g. validation errors).
        };
        // Ref to the hidden file input so we can programmatically trigger a click.
        this.fileRef = React.createRef();
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
        const file = e.target.files[0];
        if (!file) return;

        this.setState({ fileName: file.name });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
        // Optional: add validation here (e.g. file type/size) and setState({ errorMes: "..." }).
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
            <div className="file-upload">
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

                {errorMes && <div className="file-upload__error">{errorMes}</div>}

                {this.additionalLinkInformation()}

                <div className="file-upload__divider"></div>

                <div className="file-upload__actions">
                    <button className="file-upload__action-button">
                        Submit
                    </button>
                </div>
            </div>
        );
    }
}

export default CustomFileInput;
