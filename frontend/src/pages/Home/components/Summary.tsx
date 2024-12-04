import React, { useState } from 'react';
import './summary.css'
import './sidebar.css'

interface SummaryProps {
    handleSummarySelect: () => void;
}

function Summary() {

    const formattedDate = localStorage.getItem("summaryDateCreated")
        ? new Date(localStorage.getItem("summaryDateCreated") || "").toLocaleString("en-US", {
            weekday: "short",  // "Tue"
            year: "numeric",   // "2024"
            month: "short",    // "Dec"
            day: "numeric",    // "3"
            hour: "numeric",   // "10"
            minute: "2-digit", // "04"
            hour12: true,      // 12-hour format
        })
        : "Date not available";


    return (
        <>
        <div className="right-container">
            <h1 className="container-heading">Summary Page</h1>
            <p className="container-information">Summary of {localStorage.getItem("summaryName")}</p>
            <p className="container-information">Created: {formattedDate}</p>
            <textarea id="summary-text-box" readOnly>
                {localStorage.getItem("summary")}
            </textarea>
        </div>
        <div className="past-files-side-bar">
            <div className="past-files-side-bar-header">Past Summaries:</div>
            <div className="past-summaries-text">filename.pdf</div>
            <div className="past-summaries-text">filename1.pdf</div>
            <div className="past-summaries-text">filename2.pdf</div>
        </div>
    </>
    );
}

export default Summary;