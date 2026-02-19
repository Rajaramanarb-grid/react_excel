import React from "react";
import "@/components/TableComponent/TableComponent.scss";

const DEFAULT_VISIBLE_COLUMNS = 7;

function ExpandIcon({ onClick, ariaLabel }) {
    return (
        <button
            type="button"
            className="table-component__expand-btn"
            onClick={onClick}
            aria-label={ariaLabel}
            title="Show extra columns"
        >
            <svg
                className="table-component__expand-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                <polyline points="9 18 15 12 9 6" />
            </svg>
        </button>
    );
}

function TableComponent({
    headers = [],
    data = [],
    visibleColumnCount = DEFAULT_VISIBLE_COLUMNS,
}) {
    const visibleHeaders =
        visibleColumnCount != null && visibleColumnCount >= 0
            ? headers.slice(0, visibleColumnCount)
            : headers;
    const excessHeaders = headers.slice(visibleColumnCount);
    const hasExcessColumns = excessHeaders.length > 0;

    const handleExpandClick = (row) => {
        const lines = excessHeaders.map(
            (key) => `${key}: ${row[key] != null ? String(row[key]) : ""}`
        );
        alert(lines.join("\n"));
    };

    const colSpanEmpty = hasExcessColumns
        ? visibleHeaders.length + 1
        : visibleHeaders.length || 1;

    return (
        <div className="table-component">
            <table className="table-component__table">
                <thead className="table-component__head">
                    <tr>
                        {hasExcessColumns && (
                            <th
                                className="table-component__th table-component__th--expand"
                                aria-label="Expand row"
                            />
                        )}
                        {visibleHeaders.map((key, index) => (
                            <th
                                key={index}
                                className="table-component__th"
                            >
                                {key}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="table-component__body">
                    {data.length === 0 ? (
                        <tr>
                            <td
                                colSpan={colSpanEmpty}
                                className="table-component__empty"
                            >
                                No data available
                            </td>
                        </tr>
                    ) : (
                        data.map((row, rowIndex) => (
                            <tr
                                key={rowIndex}
                                className="table-component__row"
                            >
                                {hasExcessColumns && (
                                    <td className="table-component__td table-component__td--expand">
                                        <ExpandIcon
                                            onClick={() =>
                                                handleExpandClick(row)
                                            }
                                            ariaLabel={`Show extra columns for row ${rowIndex + 1}`}
                                        />
                                    </td>
                                )}
                                {visibleHeaders.map((key, colIndex) => (
                                    <td
                                        key={colIndex}
                                        className="table-component__td"
                                    >
                                        {row[key]}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
