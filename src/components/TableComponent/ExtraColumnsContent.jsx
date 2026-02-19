import React from "react";
import "@/components/TableComponent/ExtraColumnsContent.scss";

function ExtraColumnsContent({ headers = [], row = {} }) {
    if (headers.length === 0) return null;

    return (
        <div className="extra-columns">
            {headers.map((key) => (
                <div key={key} className="extra-columns__row">
                    <span className="extra-columns__key">{key}</span>
                    <span className="extra-columns__value">
                        {row[key] != null ? String(row[key]) : "—"}
                    </span>
                </div>
            ))}
        </div>
    );
}

export default ExtraColumnsContent;
