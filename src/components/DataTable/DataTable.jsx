import React, { Component } from "react";
import "./DataTable.scss";
import CustomCheckbox from "./CustomCheckbox";

export class DataTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expandedRows: {}, // Track which rows are expanded
            selectedRows: {}, // Track which rows are selected
        };
    }

    /**
     * Toggle row expansion to show/hide remaining columns
     */
    toggleRowExpansion = (rowIndex) => {
        this.setState((prevState) => ({
            expandedRows: {
                ...prevState.expandedRows,
                [rowIndex]: !prevState.expandedRows[rowIndex],
            },
        }));
    };

    /**
     * Toggle row selection
     */
    toggleRowSelection = (rowIndex) => {
        this.setState((prevState) => {
            const newSelectedRows = {
                ...prevState.selectedRows,
                [rowIndex]: !prevState.selectedRows[rowIndex],
            };
            
            // Call callback if provided
            if (this.props.onRowSelect) {
                this.props.onRowSelect(rowIndex, newSelectedRows[rowIndex]);
            }
            
            return { selectedRows: newSelectedRows };
        });
    };

    /**
     * Convert header string to camelCase to match object keys
     * Example: "Date Implemented" → "dateImplemented"
     */
    headerToCamelCase = (header) => {
        return header
            .split(" ")
            .map((word, index) => {
                if (index === 0) {
                    return word.toLowerCase();
                }
                return (
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                );
            })
            .join("");
    };

    /**
     * Handle action button click
     * @param {Object} rowData - The data of the clicked row
     */
    handleRowAction = (rowData) => {
        console.log("Action clicked for row:", rowData);
        // You can add custom logic here or call a prop function
        if (this.props.onRowAction) {
            this.props.onRowAction(rowData);
        }
    };

    /**
     * Get the value from row data based on header
     */
    getCellValue = (rowData, header) => {
        const key = this.headerToCamelCase(header);
        return rowData[key] || "";
    };

    render() {
        const { headers, data, visibleColumns } = this.props;
        const { expandedRows, selectedRows } = this.state;

        // Ensure visibleColumns is between 1 and 4
        const maxVisibleColumns = Math.min(
            Math.max(visibleColumns || headers.length, 1),
            4,
        );

        // Get only the visible headers
        const visibleHeaders = headers.slice(0, maxVisibleColumns);

        // Get remaining headers (hidden columns)
        const remainingHeaders = headers.slice(maxVisibleColumns);

        const showActionColumn = headers.length > 4;

        return (
            <div className="data-table">
                <div className="data-table__wrapper">
                    <table className="data-table__table">
                        <thead className="data-table__header">
                            <tr className="data-table__row">
                                {showActionColumn && (
                                    <th className="data-table__cell data-table__cell--header"></th>
                                )}
                                {this.props.validation && (
                                    <th className="data-table__cell data-table__cell--header"></th>
                                )}
                                {visibleHeaders.map((header, index) => (
                                    <th
                                        key={index}
                                        className="data-table__cell data-table__cell--header"
                                    >
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="data-table__body">
                            {data.length > 0 ? (
                                data.map((row, rowIndex) => (
                                    <React.Fragment key={rowIndex}>
                                        <tr className="data-table__row data-table__row--body">
                                            {showActionColumn && (
                                                <td className="data-table__cell data-table__cell--action">
                                                    <button
                                                        className="data-table__button"
                                                        onClick={() =>
                                                            this.toggleRowExpansion(
                                                                rowIndex,
                                                            )
                                                        }
                                                    >
                                                        {expandedRows[rowIndex]
                                                            ? "-"
                                                            : "+"}
                                                    </button>
                                                </td>
                                            )}
                                            {this.props.validation && (
                                                <td className="data-table__cell data-table__cell--action">
                                                    <CustomCheckbox
                                                        checked={selectedRows[rowIndex] || false}
                                                        onChange={() => this.toggleRowSelection(rowIndex)}
                                                    />
                                                </td>
                                            )}
                                            {visibleHeaders.map(
                                                (header, cellIndex) => (
                                                    <td
                                                        key={cellIndex}
                                                        className="data-table__cell"
                                                    >
                                                        {this.getCellValue(
                                                            row,
                                                            header,
                                                        )}
                                                    </td>
                                                ),
                                            )}
                                        </tr>
                                        {expandedRows[rowIndex] &&
                                            remainingHeaders.length > 0 && (
                                                <tr className="data-table__row data-table__row--expanded">
                                                    <td
                                                        className="data-table__cell data-table__cell--expanded"
                                                        colSpan={
                                                            visibleHeaders.length +
                                                            (showActionColumn
                                                                ? 1
                                                                : 0) +
                                                            (this.props
                                                                .validation
                                                                ? 1
                                                                : 0)
                                                        }
                                                    >
                                                        <div className="data-table__expanded-content">
                                                            {remainingHeaders.map(
                                                                (
                                                                    header,
                                                                    index,
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            index
                                                                        }
                                                                        className="data-table__expanded-item"
                                                                    >
                                                                        <strong className="data-table__expanded-label">
                                                                            {
                                                                                header
                                                                            }
                                                                            :
                                                                        </strong>
                                                                        <span className="data-table__expanded-value">
                                                                            {this.getCellValue(
                                                                                row,
                                                                                header,
                                                                            )}
                                                                        </span>
                                                                    </div>
                                                                ),
                                                            )}
                                                        </div>
                                                    </td>
                                                </tr>
                                            )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <tr className="data-table__row data-table__row--empty">
                                    <td
                                        className="data-table__cell data-table__cell--empty"
                                        colSpan={
                                            showActionColumn
                                                ? visibleHeaders.length + 1
                                                : visibleHeaders.length
                                        }
                                    >
                                        No data available
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default DataTable;
