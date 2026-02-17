import React, { Component } from "react";
import blueIcon from "../../assets/download-blue.svg";
import redIcon from "../../assets/download-red.svg";
import "./CustomFileInput.scss";

export class CustomFileInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: "",
            errorMes:"",
        };

        this.fileRef = React.createRef();
    }


    additionalLinkInformation = () =>{
        return(
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
        )
    }

    handleButtonClick = () => {
        this.fileRef.current.click();
    };

    handleFileChange = (e) => {
        const file = e.target.files[0];

        this.setState({ fileName: file.name });

        if (this.props.onChange) {
            this.props.onChange(e);
        }

        // Add validation here:
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
                        ref={this.fileRef}
                        onChange={this.handleFileChange}
                        className="file-upload__file-input"
                    />
                </div>

                {error && <div className="file-upload__error">{error}</div>}

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
