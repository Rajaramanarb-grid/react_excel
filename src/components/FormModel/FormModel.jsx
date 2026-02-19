import { Component } from "react";
import "@/components/FormModel/FormModel.scss";
import InputField from "../InputField/InputField";
import warning from "../../assets/warning.svg";

export class FormModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {},
            errors: {},
        };
    }

    componentDidMount() {
        this.initializeFormData();
    }

    initializeFormData = () => {
        const { selectedRowData } = this.props;
        if (selectedRowData) {
            const formData = selectedRowData.reduce((acc, item) => {
                acc[item.label] = item.value;
                return acc;
            }, {});
            this.setState({ formData });
        }
    };

    convertToDateInputFormat = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";

            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, "0");
            const day = String(date.getDate()).padStart(2, "0");

            return `${year}-${month}-${day}`;
        } catch (error) {
            return "";
        }
    };

    convertFromDateInputFormat = (dateString) => {
        if (!dateString) return "";

        try {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) return "";

            const month = date.getMonth() + 1;
            const day = date.getDate();
            const year = date.getFullYear();

            return `${month}/${day}/${year}`;
        } catch (error) {
            return "";
        }
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(
            (prevState) => ({
                formData: {
                    ...prevState.formData,
                    [name]: value,
                },
            }),
            () => {
                // Validate the field after update
                this.validateField(name, value);
            },
        );
    };

    validateField = (fieldName, value) => {
        const { errors } = this.state;
        let error = "";

        // Required field validation (all except Date Implemented)
        if (
            fieldName !== "Date Implemented" &&
            (!value || value.trim() === "")
        ) {
            error = "This field is required";
        }

        // Date validation for Date Implemented
        if (fieldName === "Date Implemented" && value) {
            const selectedDate = new Date(value);
            const today = new Date();

            if (selectedDate > today) {
                error = "Future dates are not allowed";
            }
        }

        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [fieldName]: error,
            },
        }));
    };

    handleSubmit = () => {
        const { onSave, onClose } = this.props;
        const { formData } = this.state;

        if (onSave) {
            const formattedData = { ...formData };
            if (formattedData["Date Implemented"]) {
                formattedData["Date Implemented"] =
                    this.convertFromDateInputFormat(
                        formattedData["Date Implemented"],
                    );
            }
            onSave(formattedData);
        }
        onClose();
    };

    render() {
        const { selectedRowData, onClose, errorMessage } = this.props;
        const { formData, errors } = this.state;

        return (
            <div className="form-model__overlay" onClick={onClose}>
                <div
                    className="form-model"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="form-model__header">
                        <h2 className="form-model__title">SubCompany Detail</h2>
                    </div>

                    <div className="form-model__container">
                        {errorMessage && (
                            <div className="form-model__error-banner">
                                <div className="form-model__error-content">
                                    <img
                                        src={warning}
                                        alt="Warning"
                                        className="form-model__image"
                                    />
                                    <span className="form-model__error-text">
                                        {errorMessage}
                                    </span>
                                </div>
                                <button
                                    className="form-model__error-close"
                                    onClick={onClose}
                                    type="button"
                                >
                                    &times;
                                </button>
                            </div>
                        )}

                        <div className="form-model__body">
                            <div className="form-model__grid">
                                {selectedRowData &&
                                    selectedRowData.map((item, index) => (
                                        <div
                                            key={index}
                                            className="form-model__field"
                                        >
                                            {item.label ===
                                            "Date Implemented" ? (
                                                <InputField
                                                    placeholder={item.label}
                                                    name={item.label}
                                                    type="date"
                                                    value={this.convertToDateInputFormat(
                                                        formData[item.label] ||
                                                            "",
                                                    )}
                                                    onChange={this.handleChange}
                                                    error={
                                                        errors[item.label] || ""
                                                    }
                                                />
                                            ) : (
                                                <InputField
                                                    placeholder={item.label}
                                                    name={item.label}
                                                    type="text"
                                                    value={
                                                        formData[item.label] ||
                                                        ""
                                                    }
                                                    onChange={this.handleChange}
                                                    error={
                                                        errors[item.label] || ""
                                                    }
                                                />
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-model__footer">
                        <button
                            className="form-model__button form-model__button--cancel"
                            onClick={onClose}
                            type="button"
                        >
                            Cancel
                        </button>
                        <button
                            className="form-model__button form-model__button--submit"
                            type="button"
                            onClick={this.handleSubmit}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormModel;
