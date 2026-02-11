import React, { Component } from "react";
import "@/components/FormModel/FormModel.scss";

export class FormModel extends Component {
    render() {
        return (
            <div
                className="form-model-modal-overlay"
                onClick={this.props.onClose}
            >
                <div
                    className="form-model-modal"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="form-model-modal-header">
                        <h3>Row Details</h3>
                        <button
                            className="form-model-modal-close"
                            onClick={this.props.onClose}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="form-model-modal-body">
                        {this.props.selectedRowData &&
                            this.props.selectedRowData.map((item, index) => (
                                <div
                                    key={index}
                                    className="form-model-modal-row"
                                >
                                    <span className="form-model-modal-label">
                                        {item.label}:
                                    </span>
                                    <span className="form-model-modal-value">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        );
    }
}

export default FormModel;
