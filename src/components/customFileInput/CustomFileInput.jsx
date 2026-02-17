import React, { Component } from "react";
import "./CustomFileInput.scss";

export class CustomFileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            error: "",
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

        // Size Validation (5MB)
        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) {
            this.setState({
                error: "File must be less than 5MB",
            });
            return;
        }

        // Accepts: 16-02-2026_test_data.csv OR 16_02_2026_test_data.csv
        const fileNameRegex =
            /^(0[1-9]|[12][0-9]|3[01])[-_](0[1-9]|1[0-2])[-_]\d{4}_test_data\.csv$/i;

        if (!fileNameRegex.test(file.name)) {
            this.setState({
                error: "Invalid file name. Format should be dd-mm-yyyy_test_data.csv",
            });
            return;
        }

        this.setState({ fileName: file.name, error: "" });

        if (this.props.onChange) {
            this.props.onChange(e);
        }
    };

    render() {
        const { fileName } = this.state;

        return (
            <div>
                <div className="custom-file">
                    <input
                        type="text"
                        value={fileName}
                        placeholder="Upload"
                        readOnly
                        className="custom-file__input"
                    />

                    <button
                        type="button"
                        className="custom-file__button"
                        onClick={this.handleButtonClick}
                    >
                        CHOOSE
                    </button>

                    <input
                        type="file"
                        accept=".csv"
                        ref={this.fileRef}
                        onChange={this.handleFileChange}
                        className="custom-file__hidden"
                    />
                </div>

                <div className="custom-file__download">
                    <div className="custom-file__download-item">
                        <img src="" alt="" className="" />
                        <a
                            href=""
                            className="custom-file__download-link custom-file__download-link-1"
                        >
                            DOWNLOAD TEMPLATE
                        </a>
                    </div>
                    <div className="custom-file__download-item">
                        <img src="" alt="" className="" />
                        <a
                            href=""
                            className="custom-file__download-link custom-file__download-link-2"
                        >
                            DOWNLOAD INSTRUCTIONS
                        </a>
                    </div>
                </div>

                {this.state.error && (
                    <div className="custom-file__error">{this.state.error}</div>
                )}
            </div>
        );
    }
}

export default CustomFileInput;
