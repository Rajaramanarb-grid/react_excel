import { PureComponent } from "react";
import "../InputField/InputField.scss";

export class InputFieldBase extends PureComponent {
    render() {
        const {
            isFocused,
            hasValue,
            onFocusInput,
            onBlurInput,
            onChangeInput,
            placeholder = "Enter text",
            type = "text",
            name,
            value,
            maxLength,
            pattern,
            error,
        } = this.props;

        const isActive = isFocused || hasValue;
        const hasError = error && error.length > 0;

        return (
            <div className="input-field-wrapper">
                <div
                    className={`input-field ${
                        isActive ? "input-field--active" : ""
                    } ${hasError ? "input-field--error" : ""}`}
                >
                    <label
                        className={`input-field__label ${
                            isActive ? "input-field__label--active" : ""
                        }`}
                    >
                        {placeholder}
                    </label>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        className="input-field__input"
                        onFocus={onFocusInput}
                        onBlur={onBlurInput}
                        onChange={onChangeInput}
                        maxLength={maxLength}
                        pattern={pattern}
                    />
                </div>
                {hasError && (
                    <p className="input-field__error-message">{error}</p>
                )}
            </div>
        );
    }
}
