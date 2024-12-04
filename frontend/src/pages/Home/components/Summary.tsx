import React, { useState } from 'react';
import './summary.css'
import './sidebar.css'

function Summary() {




    return (
        <>
        <div className="right-container">
            <h1 className="container-heading">Summary</h1>
            <p className="container-information">Summary of filename.pdf</p>
            <p className="container-information">Created: 11/24/2024</p>
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