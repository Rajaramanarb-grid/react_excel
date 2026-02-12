import { PureComponent } from "react";
import "./FormModel.scss";
import logo from "../../assets/logo-rapid.svg";
import InputField from "../InputField/InputField";
import { Dropdown } from "../Dropdown/Dropdown";
import { FOOTER } from "../../const/footer";
import {
    getYearOptions,
    validateFirstName,
    validateLastName,
    validateCardNumber,
    validateExpMonth,
    validateExpYear,
    validateCVV,
    validateSSN,
    formatCardNumber,
    formatSSN,
} from "../../utils/FormUtils";

export class FormModel extends PureComponent {
    constructor(props) {
        super(props);

        const initialFormData = this.getInitialFormData(props.selectedRowData);

        this.state = {
            formData: initialFormData,
            errors: {
                firstName: "",
                lastName: "",
                cardNumber: "",
                expMonth: "",
                expYear: "",
                cvv: "",
                ssn: "",
            },
            touched: {
                firstName: true,
                lastName: true,
                cardNumber: true,
                expMonth: true,
                expYear: true,
                cvv: true,
                ssn: true,
            },
        };
    }

    getInitialFormData = (selectedRowData) => {
        const defaultData = {
            firstName: "",
            lastName: "",
            cardNumber: "",
            expMonth: "",
            expYear: "",
            cvv: "",
            ssn: "",
        };

        if (!selectedRowData || !Array.isArray(selectedRowData)) {
            return defaultData;
        }

        // Map the selectedRowData to form fields
        const dataMap = {};
        selectedRowData.forEach((item) => {
            const label = item.label.toLowerCase().replace(/\s+/g, "");
            switch (label) {
                case "firstname":
                    dataMap.firstName = item.value || "";
                    break;
                case "lastname":
                    dataMap.lastName = item.value || "";
                    break;
                case "id":
                    dataMap.id = item.value || "";
                    break;
                case "cardnumber":
                    dataMap.cardNumber = formatCardNumber(item.value || "");
                    break;
                case "expmonth":
                    dataMap.expMonth = item.value || "";
                    break;
                case "expyear":
                    dataMap.expYear = item.value || "";
                    break;
                case "cvv":
                    dataMap.cvv = item.value || "";
                    break;
                case "ssn":
                    // dataMap.ssn = formatSSN(item.value || "");
                    dataMap.ssn = item.value || "";
                    break;
                default:
                    break;
            }
        });

        return { ...defaultData, ...dataMap };
    };

    getMonthOptions = () => {
        const months = [
            { value: "Jan", label: "Jan" },
            { value: "Feb", label: "Feb" },
            { value: "Mar", label: "Mar" },
            { value: "Apr", label: "Apr" },
            { value: "May", label: "May" },
            { value: "Jun", label: "Jun" },
            { value: "Jul", label: "Jul" },
            { value: "Aug", label: "Aug" },
            { value: "Sep", label: "Sep" },
            { value: "Oct", label: "Oct" },
            { value: "Nov", label: "Nov" },
            { value: "Dec", label: "Dec" },
        ];
        return months;
    };

    handleChange = (e) => {
        const { name, value } = e.target;
        let formattedValue = value;

        if (name === "cardNumber") {
            const digitsOnly = value.replace(/\D/g, "");
            if (digitsOnly.length <= 16) {
                formattedValue = formatCardNumber(digitsOnly);
            } else {
                return;
            }
        }

        if (name === "ssn") {
            const digitsOnly = value.replace(/\D/g, "");
            // if (digitsOnly.length <= 9) {
            //     formattedValue = formatSSN(digitsOnly);
            // } else {
            //     return;
            // }
            if (digitsOnly.length > 9) {
                return;
            }
        }

        if (name === "cvv") {
            if (!/^\d*$/.test(value)) {
                return;
            }
        }

        this.setState(
            (prevState) => ({
                formData: {
                    ...prevState.formData,
                    [name]: formattedValue,
                },
            }),
            () => {
                if (this.state.touched[name]) {
                    this.validateField(name, formattedValue);
                }
            },
        );
    };

    handleBlur = (name) => {
        if (name === "ssn") {
            this.setState((prev) => ({
                formData: {
                    ...prev.formData,
                    // ssn: formatSSN(prev.formData.ssn),
                    ssn: prev.formData.ssn,
                },
            }));
        }

        this.setState(
            (prevState) => ({
                touched: {
                    ...prevState.touched,
                    [name]: true,
                },
            }),
            () => {
                this.validateField(name, this.state.formData[name]);
            },
        );
    };

    validateField = (name, value) => {
        let error = "";

        switch (name) {
            case "firstName":
                error = validateFirstName(value);
                break;
            case "lastName":
                error = validateLastName(value);
                break;
            case "cardNumber":
                error = validateCardNumber(value);
                break;
            case "expMonth":
                error = validateExpMonth(value);
                break;
            case "expYear":
                error = validateExpYear(value);
                break;
            case "cvv":
                error = validateCVV(value);
                break;
            case "ssn":
                error = validateSSN(value);
                break;
            default:
                break;
        }

        this.setState((prevState) => ({
            errors: {
                ...prevState.errors,
                [name]: error,
            },
        }));
    };

    handleError = () => {
        const errors = {
            firstName: validateFirstName(this.state.formData.firstName),
            lastName: validateLastName(this.state.formData.lastName),
            cardNumber: validateCardNumber(this.state.formData.cardNumber),
            expMonth: validateExpMonth(this.state.formData.expMonth),
            expYear: validateExpYear(this.state.formData.expYear),
            cvv: validateCVV(this.state.formData.cvv),
            ssn: validateSSN(this.state.formData.ssn),
        };

        this.setState({ errors });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.handleError();

        const { errors } = this.state;
        const hasErrors = Object.values(errors).some((error) => error !== "");

        if (!hasErrors && this.props.onRowChange) {
            // Map form data back to the original column order
            const { formData } = this.state;
            const { selectedRowData } = this.props;
            
            // Create an array of values in the correct order based on selectedRowData
            const updatedRowArray = selectedRowData.map((item) => {
                const label = item.label.toLowerCase().replace(/\s+/g, "");
                switch (label) {
                    case "firstname":
                        return formData.firstName;
                    case "lastname":
                        return formData.lastName;
                    case "cardnumber":
                        // Remove spaces for storage
                        return formData.cardNumber.replace(/\s/g, "");
                    case "expmonth":
                        return formData.expMonth;
                    case "expyear":
                        return formData.expYear;
                    case "cvv":
                        return formData.cvv;
                    case "ssn":
                        // Remove hyphens and asterisks for storage
                        return formData.ssn.replace(/[-*]/g, "");
                    default:
                        return item.value;
                }
            });

            this.props.onRowChange(updatedRowArray);
        } else {
            console.log("Form has errors, please fix them before submitting.");
        }
    };

    componentDidMount() {
        this.handleError();
    }

    render() {
        const { formData, errors, touched } = this.state;
        const { onClose } = this.props;

        return (
            <div className="signup-overlay" onClick={onClose}>
                <div className="signup" onClick={(e) => e.stopPropagation()}>
                    <div className="signup__container">
                        <div className="signup__header">
                            <img
                                src={logo}
                                alt="logo"
                                className="signup__logo"
                            />
                            {onClose && (
                                <button
                                    className="signup__close"
                                    onClick={onClose}
                                    type="button"
                                    aria-label="Close"
                                >
                                    &times;
                                </button>
                            )}
                        </div>

                        <h1 className="signup__title">
                            Please enter rapid! PayCard information
                        </h1>

                        <form className="signup__form">
                            <InputField
                                placeholder="First Name"
                                name="firstName"
                                type="text"
                                value={formData.firstName}
                                onChange={this.handleChange}
                                onBlur={() => this.handleBlur("firstName")}
                                error={
                                    touched.firstName ? errors.firstName : ""
                                }
                            />

                            <InputField
                                placeholder="Last Name"
                                name="lastName"
                                type="text"
                                value={formData.lastName}
                                onChange={this.handleChange}
                                onBlur={() => this.handleBlur("lastName")}
                                error={touched.lastName ? errors.lastName : ""}
                            />

                            <InputField
                                placeholder="Enter 16 Digit Card Number"
                                name="cardNumber"
                                type="text"
                                value={formData.cardNumber}
                                onChange={this.handleChange}
                                onBlur={() => this.handleBlur("cardNumber")}
                                error={
                                    touched.cardNumber ? errors.cardNumber : ""
                                }
                            />

                            <div className="signup__form-row">
                                <Dropdown
                                    placeholder="Exp. Month"
                                    name="expMonth"
                                    value={formData.expMonth}
                                    options={this.getMonthOptions()}
                                    onChange={this.handleChange}
                                    error={
                                        touched.expMonth ? errors.expMonth : ""
                                    }
                                />

                                <Dropdown
                                    placeholder="Exp. Year"
                                    name="expYear"
                                    value={formData.expYear}
                                    options={getYearOptions()}
                                    onChange={this.handleChange}
                                    error={
                                        touched.expYear ? errors.expYear : ""
                                    }
                                />
                            </div>

                            <InputField
                                placeholder="CVV"
                                name="cvv"
                                type="text"
                                value={formData.cvv}
                                onChange={this.handleChange}
                                onBlur={() => this.handleBlur("cvv")}
                                maxLength="3"
                                error={touched.cvv ? errors.cvv : ""}
                            />

                            <InputField
                                placeholder="Enter SSN"
                                name="ssn"
                                type="text"
                                value={formData.ssn}
                                onChange={this.handleChange}
                                onBlur={() => this.handleBlur("ssn")}
                                error={touched.ssn ? errors.ssn : ""}
                            />

                            <button
                                className="signup__button signup__button--primary"
                                type="submit"
                                onClick={this.handleSubmit}
                            >
                                Continue
                            </button>

                            <button
                                className="signup__button signup__button--secondary"
                                type="button"
                                onClick={onClose}
                            >
                                Cancel
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormModel;
