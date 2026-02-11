import React, { PureComponent } from "react";
import classNames from "classnames/bind";
import styles from "@/components/CsvUpload/CsvUpload.module.scss";

const cx = classNames.bind(styles);

export class CsvUpload extends PureComponent {
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

    handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        this.setState({ fileName: file.name });

        // your CSV logic here
    };

    render() {
        const { fileName } = this.state;

        return (
            <div className={cx("csv__upload")}>
                {/* Hidden actual file input */}
                <input
                    type="file"
                    accept=".csv"
                    ref={this.fileRef}
                    onChange={this.handleFileUpload}
                    className={cx("csv__hidden-input")}
                />

                {/* Visible UI */}
                <div className={cx("csv__input-wrapper")}>
                    <input
                        type="text"
                        value={fileName}
                        placeholder="No file chosen"
                        readOnly
                        className={cx("csv__text-input")}
                    />

                    <button
                        type="button"
                        onClick={this.handleButtonClick}
                        className={cx("csv__button")}
                    >
                        Choose File
                    </button>
                </div>
            </div>
        );
    }
}

export default CsvUpload;
