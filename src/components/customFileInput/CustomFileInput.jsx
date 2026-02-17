import React, { Component } from "react";
import blueIcon from "../../assets/download-blue.svg";
import redIcon from "../../assets/download-red.svg";
import "./CustomFileInput.scss";

export class CustomFileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
        };

        this.fileRef = React.createRef();
    }

    handleButtonClick = () => {
        this.fileRef.current.click();
    };

    handleFileChange = (e) => {
        const file = e.target.files[0];

        if (!file) {
            alert("File is required");
            return;
        }

        this.setState({ fileName: file.name });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    render() {
        const { fileName, error } = this.state;

        return (
            <div className="file-upload">
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

                    <input
                        type="file"
                        accept=".csv"
                        ref={this.fileRef}
                        onChange={this.handleFileChange}
                        className="file-upload__file-input"
                    />
                </div>

                {error && <div className="file-upload__error">{error}</div>}

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
