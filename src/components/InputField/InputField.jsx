import { PureComponent } from "react";
import "./InputField.scss";
import { InputFieldBase } from "../InputFieldBase/InputFieldBase";

const withFloatingLabel = (WrappedComponent) => {
    return class extends PureComponent {
        constructor(props) {
            super(props);
            this.state = {
                isFocused: true,
                hasValue: false,
            };
        }

        handleFocus = () => {
            this.setState({ isFocused: true });
            if (this.props.onFocus) {
                this.props.onFocus();
            }
        };

        handleBlur = (e) => {
            this.setState({
                isFocused: false,
                hasValue: e.target.value.length > 0,
            });
            if (this.props.onBlur) {
                this.props.onBlur(e);
            }
        };

        handleChange = (e) => {
            this.setState({ hasValue: e.target.value.length > 0 });
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        };

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    isFocused={this.state.isFocused}
                    hasValue={this.state.hasValue}
                    onFocusInput={this.handleFocus}
                    onBlurInput={this.handleBlur}
                    onChangeInput={this.handleChange}
                />
            );
        }
    };
};

export const InputField = withFloatingLabel(InputFieldBase);

export default InputField;
