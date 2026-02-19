import React, { useState, useRef, useEffect } from "react";
import "@/components/TableComponent/TableComponent.scss";
import ExtraColumnsContent from "@/components/TableComponent/ExtraColumnsContent";
import ExpandIcon from "@/components/TableComponent/ExpandIcon";

function TableComponent({
    headers = [],
    data = [],
    visibleColumnCount = 7,
    validation,
}) {
    const [expandedRowIndex, setExpandedRowIndex] = useState(null);
    const [selectedRows, setSelectedRows] = useState(new Set());
    const headerCheckboxRef = useRef(null);

    const visibleHeaders =
        visibleColumnCount != null && visibleColumnCount >= 0
            ? headers.slice(0, visibleColumnCount)
            : headers;
    const excessHeaders = headers.slice(visibleColumnCount);
    const hasExcessColumns = excessHeaders.length > 0;

    const showValidation = Boolean(validation);

    const handleExpandClick = (rowIndex) => {
        setExpandedRowIndex((prev) =>
            prev === rowIndex ? null : rowIndex
        );
    };

    // const allSelected =
    //     data.length > 0 && selectedRows.size === data.length;
    // const someSelected = selectedRows.size > 0;

    // const handleHeaderCheckboxChange = () => {
    //     if (allSelected) {
    //         setSelectedRows(new Set());
    //     } else {
    //         setSelectedRows(new Set(data.map((_, i) => i)));
    //     }
    // };

    const handleRowCheckboxChange = (rowIndex) => {
        setSelectedRows((prev) => {
            const next = new Set(prev);
            if (next.has(rowIndex)) {
                next.delete(rowIndex);
            } else {
                next.add(rowIndex);
            }
            return next;
        });
    };

    const colSpanEmpty =
        (hasExcessColumns ? 1 : 0) +
        (showValidation ? 1 : 0) +
        visibleHeaders.length;
    const colSpanExpand =
        (hasExcessColumns ? 1 : 0) +
        (showValidation ? 1 : 0) +
        visibleHeaders.length;

    // useEffect(() => {
    //     const el = headerCheckboxRef.current;
    //     if (el) el.indeterminate = someSelected && !allSelected;
    // }, [someSelected, allSelected]);

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
                        {showValidation && (
                            <th
                                className="table-component__th table-component__th--checkbox"
                                aria-label="Select all"
                            >
                                <input
                                    type="checkbox"
                                    className="table-component__checkbox"
                                    ref={headerCheckboxRef}
                                    //checked={allSelected}
                                    //onChange={handleHeaderCheckboxChange}
                                    aria-label="Select all rows"
                                />
                            </th>
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
                                    {showValidation && (
                                        <td className="table-component__td table-component__td--checkbox">
                                            <input
                                                type="checkbox"
                                                className="table-component__checkbox"
                                                checked={selectedRows.has(rowIndex)}
                                                onChange={() =>
                                                    handleRowCheckboxChange(rowIndex)
                                                }
                                                aria-label={`Select row ${rowIndex + 1}`}
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
                                {hasExcessColumns && expandedRowIndex === rowIndex && (
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
