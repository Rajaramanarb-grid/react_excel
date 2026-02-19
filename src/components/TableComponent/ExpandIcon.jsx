import React from "react";
import "@/components/TableComponent/ExpandIcon.scss";

function ExpandIcon({ onClick, ariaLabel, isExpanded }) {
    return (
        <button
            type="button"
            className={`expand-icon ${isExpanded ? "expand-icon--expanded" : "expand-icon--collapsed"}`}
            onClick={onClick}
            aria-label={ariaLabel}
            aria-expanded={isExpanded}
            title={isExpanded ? "Collapse extra columns" : "Show extra columns"}
        >
            <svg
                className="expand-icon__icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            >
                {isExpanded ? (
                    <line x1="6" y1="12" x2="18" y2="12" />
                ) : (
                    <>
                        <line x1="12" y1="6" x2="12" y2="18" />
                        <line x1="6" y1="12" x2="18" y2="12" />
                    </>
                )}
            </svg>
        </button>
    );
}

export default ExpandIcon;
