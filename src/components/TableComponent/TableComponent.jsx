import React, { useState } from "react";
import "@/components/TableComponent/TableComponent.scss";
import ExtraColumnsContent from "@/components/TableComponent/ExtraColumnsContent";
import ExpandIcon from "@/components/TableComponent/ExpandIcon";

const DEFAULT_VISIBLE_COLUMNS = 5;

function TableComponent({
    headers = [],
    data = [],
    visibleColumnCount = DEFAULT_VISIBLE_COLUMNS,
}) {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);

    const visibleHeaders =
        visibleColumnCount != null && visibleColumnCount >= 0
            ? headers.slice(0, visibleColumnCount)
            : headers;
    const excessHeaders = headers.slice(visibleColumnCount);
    const hasExcessColumns = excessHeaders.length > 0;

    const handleExpandClick = (rowIndex) => {
        setExpandedRowIndex((prev) =>
            prev === rowIndex ? null : rowIndex
        );
    };

    const colSpanEmpty = hasExcessColumns
        ? visibleHeaders.length + 1
        : visibleHeaders.length || 1;
    const colSpanExpand = visibleHeaders.length + 1;

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
                            <React.Fragment key={rowIndex}>
                                <tr className="table-component__row">
                                    {hasExcessColumns && (
                                        <td className="table-component__td table-component__td--expand">
                                            <ExpandIcon
                                                onClick={() =>
                                                    handleExpandClick(rowIndex)
                                                }
                                                ariaLabel={
                                                    expandedRowIndex === rowIndex
                                                        ? `Collapse extra columns for row ${rowIndex + 1}`
                                                        : `Show extra columns for row ${rowIndex + 1}`
                                                }
                                                isExpanded={
                                                    expandedRowIndex === rowIndex
                                                }
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
                                {hasExcessColumns &&
                                    expandedRowIndex === rowIndex && (
                                        <tr className="table-component__row table-component__row--expanded">
                                            <td
                                                colSpan={colSpanExpand}
                                                className="table-component__td table-component__td--extra"
                                            >
                                                <ExtraColumnsContent
                                                    headers={excessHeaders}
                                                    row={row}
                                                />
                                            </td>
                                        </tr>
                                    )}
                            </React.Fragment>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableComponent;
