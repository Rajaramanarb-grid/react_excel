import React, { PureComponent } from "react";
import "../../styles/InputField.scss";

export class Dropdown extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,
            isFocused: false,
        };
        this.dropdownRef = React.createRef();
    }

    componentDidMount() {
        document.addEventListener("mousedown", this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener("mousedown", this.handleClickOutside);
    }

    handleClickOutside = (event) => {
        if (
            this.dropdownRef.current &&
            !this.dropdownRef.current.contains(event.target)
        ) {
            this.setState({ isOpen: false, isFocused: false });
        }
    };

    toggleDropdown = () => {
        this.setState((prevState) => ({
            isOpen: !prevState.isOpen,
            isFocused: !prevState.isOpen,
        }));
    };

    handleSelect = (value) => {
        this.setState({ isOpen: false, isFocused: false });
        if (this.props.onChange) {
            this.props.onChange({
                target: {
                    name: this.props.name,
                    value: value,
                },
            });
        }
    };

    render() {
        const { placeholder, value, options, error, name } = this.props;
        const { isOpen, isFocused } = this.state;
        const isActive = isOpen || (value && value !== "");
        const hasError = error && error.length > 0;

        return (
            <div className="input-field-wrapper">
                <div
                    className={`input-field input-field--dropdown ${
                        isActive ? "input-field--active" : ""
                    } ${hasError ? "input-field--error" : ""}`}
                    ref={this.dropdownRef}
                >
                    <label
                        className={`input-field__label ${
                            isActive ? "input-field__label--active" : ""
                        }`}
                    >
                        {placeholder}
                    </label>
                    <div
                        className="input-field__dropdown-toggle"
                        onClick={this.toggleDropdown}
                    >
                        <span className="input-field__dropdown-value">
                            {value || ""}
                        </span>
                        <svg
                            className={`input-field__dropdown-arrow ${
                                isOpen ? "input-field__dropdown-arrow--up" : ""
                            }`}
                            width="12"
                            height="8"
                            viewBox="0 0 12 8"
                            fill="none"
                        >
                            <path
                                d="M1 1L6 6L11 1"
                                stroke="#999999"
                                strokeWidth="2"
                                strokeLinecap="round"
                            />
                        </svg>
                    </div>
                    {isOpen && (
                        <div className="input-field__dropdown-menu">
                            {options.map((option) => (
                                <div
                                    key={option.value}
                                    className="input-field__dropdown-item"
                                    onClick={() =>
                                        this.handleSelect(option.value)
                                    }
                                >
                                    {option.label}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                {hasError && (
                    <p className="input-field__error-message">{error}</p>
                )}
            </div>
        );
    }
}
