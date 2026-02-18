import React from "react";
import "@/components/customerTable/CustomerTable.scss";
import ExcessDetails from "@/components/customerTable/ExcessDetails";
import ExpandCollapseButton from "@/components/customerTable/ExpandCollapseButton";
import FormModel from "@/components/FormModel/FormModel";

class CustomerTable extends React.PureComponent {
    static defaultProps = {
        columns: [],
        data: [],
        visibleColumnCount: 7,
    };

    constructor(props) {
        super(props);
        this.state = {
            expandedRowIndex: null,
            allRowsValid: true,
            isModalOpen: false,
            selectedRowData: null,
        };
    }

    handleCellClick = (rowData, columns) => {
        const rowDetails = columns.map((column, index) => ({
            label: column,
            value: rowData[index],
        }));

        this.setState({
            isModalOpen: true,
            selectedRowData: rowDetails,
        });
    };

    handleCloseModal = () => {
        this.setState({
            isModalOpen: false,
            selectedRowData: null,
        });
    };

    render() {
        const { columns, data, visibleColumnCount } = this.props;
        const { expandedRowIndex, isModalOpen, selectedRowData } = this.state;

        const effectiveCount = Math.max(
            0,
            Math.min(visibleColumnCount, columns.length),
        );
        const visibleColumns = columns.slice(0, effectiveCount);
        const excessColumns = columns.slice(effectiveCount);
        const hasExcess = excessColumns.length > 0;

        const getRowArray = (row) => [
            row.dateImplemented,
            row.subCompanyName,
            row.subCompanyID,
            row.documentName,
        ];

        const handleExpandClick = (rowIndex) => {
            this.setState((prev) => ({
                expandedRowIndex:
                    prev.expandedRowIndex === rowIndex ? null : rowIndex,
            }));
        };

        const colSpanEmpty = hasExcess
            ? visibleColumns.length + 1
            : visibleColumns.length || 1;

        return (
            <div className="customer-table customer-table-container">
                <table className="customer-table-table">
                    <thead className="customer-table-header">
                        <tr>
                            {this.props.validation &&
                                this.props.columns.length > 0 && (
                                    <th
                                        className={`customer-table-first-cell customer-table-cell-header ${
                                            hasExcess
                                                ? "customer-table-cell-expand"
                                                : "customer-table-cell-unexpand"
                                        }`}
                                        aria-label="Expand row"
                                    >
                                        <input
                                            type="checkbox"
                                            className="customer-table-checkbox"
                                            checked={this.state.allRowsValid}
                                            readOnly
                                        />
                                    </th>
                                )}
                            {!this.props.validation && hasExcess && (
                                <th
                                    className={`customer-table-first-cell customer-table-cell-header ${"customer-table-cell-unexpand"}`}
                                    aria-label="Expand row"
                                ></th>
                            )}
                            {visibleColumns.map((col, index) => (
                                <th
                                    key={index}
                                    className="customer-table-cell customer-table-cell-header"
                                >
                                    {col}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="customer-table-body">
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={colSpanEmpty}
                                    className="customer-table-empty"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => {
                                const rowArray = getRowArray(row);
                                // const isRowValid = this.validateRow(
                                //     rowArray,
                                //     columns,
                                // );
                                const isRowValid = row.statusKey === 0;
                                const visibleCells = rowArray.slice(
                                    0,
                                    effectiveCount,
                                );
                                const excessCells =
                                    rowArray.slice(effectiveCount);
                                const isExpanded =
                                    expandedRowIndex === rowIndex;
                                return (
                                    <React.Fragment key={rowIndex}>
                                        <tr className="customer-table-row">
                                            {(hasExcess ||
                                                this.props.validation ||
                                                (!this.props.validation &&
                                                    hasExcess)) && (
                                                <td className="customer-table-cell customer-table-cell-expand">
                                                    <div className="customer-table-cell-expand-content">
                                                        {hasExcess && (
                                                            <>
                                                                <ExpandCollapseButton
                                                                    isExpanded={
                                                                        isExpanded
                                                                    }
                                                                    onClick={() =>
                                                                        handleExpandClick(
                                                                            rowIndex,
                                                                        )
                                                                    }
                                                                />
                                                                {this.props
                                                                    .validation && (
                                                                    <span
                                                                        className="customer-table-expand-separator"
                                                                        aria-hidden="true"
                                                                    />
                                                                )}
                                                            </>
                                                        )}
                                                        {this.props
                                                            .validation && (
                                                            <input
                                                                type="checkbox"
                                                                className="customer-table-checkbox"
                                                                checked={
                                                                    isRowValid
                                                                }
                                                                readOnly
                                                            />
                                                        )}
                                                    </div>
                                                </td>
                                            )}
                                            {visibleCells.map(
                                                (cell, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="customer-table-cell"
                                                        {...(this.props
                                                            .validation && {
                                                            onClick: () =>
                                                                this.handleCellClick(
                                                                    rowArray,
                                                                    columns,
                                                                ),
                                                            style: {
                                                                cursor: "pointer",
                                                            },
                                                        })}
                                                    >
                                                        {cell}
                                                    </td>
                                                ),
                                            )}
                                        </tr>
                                        {hasExcess && isExpanded && (
                                            <tr
                                                className="customer-table-row-detail"
                                                aria-hidden={!isExpanded}
                                            >
                                                <td
                                                    colSpan={colSpanEmpty}
                                                    className="customer-table-detail-cell"
                                                >
                                                    <ExcessDetails
                                                        labels={excessColumns}
                                                        values={excessCells}
                                                    />
                                                </td>
                                            </tr>
                                        )}
                                    </React.Fragment>
                                );
                            })
                        )}
                    </tbody>
                </table>

                {isModalOpen && (
                    <FormModel
                        selectedRowData={selectedRowData}
                        onClose={this.handleCloseModal}
                    />
                )}
            </div>
        );
    }
}

export default CustomerTable;
