import React, { Component } from "react";
import "./CustomCheckbox.scss";

export class CustomCheckbox extends Component {
    render() {
        const { checked, onChange, disabled } = this.props;

        return (
            <label className="custom-checkbox">
                <input
                    type="checkbox"
                    className="custom-checkbox__input"
                    checked={checked}
                    onChange={onChange}
                    disabled={disabled}
                />
                <span className="custom-checkbox__checkmark">
                    {checked && (
                        <svg
                            className="custom-checkbox__icon"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    )}
                </span>
            </label>
        );
    }
}

export default CustomCheckbox;
