import React, {useEffect, useState} from 'react';
import './summary.css'
import './sidebar.css'

interface SummaryProps {
    handleSummarySelect: () => void;
}

interface listedSummary{
    name: string;
    dateCreated: string;
    summaryId: string;
}

function Summary() {
    const [listedSummaries, setListedSummaries] = useState<listedSummary[]>([]);

    const formatDate = (date: string) => {
        return date
            ? new Date(date || "").toLocaleString("en-US", {
                weekday: "short",  // "Tue"
                year: "numeric",   // "2024"
                month: "short",    // "Dec"
                day: "numeric",    // "3"
                hour: "numeric",   // "10"
                minute: "2-digit", // "04"
                hour12: true,      // 12-hour format
            })
            : "Date not available";
    }


        const handleInputChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
            let searchTerm;
            if (typeof e === 'string') {
                searchTerm = e;  // If it's a string, use it directly
            } else {
                searchTerm = e.target.value;  // If it's an event, extract the value from the event target
            }
            console.log(searchTerm);
            console.log(searchTerm);
            const data = {
                search: searchTerm,
                userId: JSON.parse(localStorage.getItem("user_data") || "{}").id
            };
            console.log(data)
            fetch("http://localhost:5000/api/search-summaries", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Data:")
                    console.log(data);
                    setListedSummaries(data.summaries);

                })
                .catch((error) => {
                    //setMessage("Error uploading file");
                });
        };

    useEffect(() => {
        console.log("useeffect")
        handleInputChange(""); // Load all summaries on page load
    }, []);

    const handleSummarySelect = (summaryId:string) => {

        const data = {
            summaryId: summaryId
        };
        fetch("http://localhost:5000/api/get-summary", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Data:")
                console.log(data);
                localStorage.setItem("summary", data.summary);
                localStorage.setItem("quiz", data.quiz);
                localStorage.setItem("summaryName", data.summaryName);
                localStorage.setItem("summaryDateCreated", data.summaryDateCreated);

            }).then(() => {
                localStorage.setItem("summaryId", summaryId);
                window.location.reload();
        })
            .catch((error) => {
                //setMessage("Error uploading file");
            });
    }

    return (
        <>
            <div className="right-container">
                <h1 className="container-heading">Summary Page</h1>
                <p className="container-information">Summary of {localStorage.getItem("summaryName")}</p>
                <p className="container-information">Created: {formatDate(localStorage.getItem("summaryDateCreated") || "")}</p>
                <textarea id="summary-text-box" readOnly>
                {localStorage.getItem("summary")}
            </textarea>
            </div>
            <div className="past-files-side-bar">
                <div className="input-box">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        onChange={handleInputChange}
                    />
                </div>
                <div className="past-files-side-bar-header">Past Summaries:</div>
                {listedSummaries.map((summary, index) => (
                    <div className="summary-card" key={index} onClick={() => handleSummarySelect(summary.summaryId)}>
                    <div className="past-summaries-text" key={index}>
                        {summary.name}
                    </div>
                    <div className="past-summaries-text" key={index}>
                     {formatDate(summary.dateCreated)}
                    </div>
                    </div>
                ))}
            </div>
        </>
    );
}


export default Summary;