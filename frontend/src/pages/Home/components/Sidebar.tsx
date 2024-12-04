import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
const apiUrl = import.meta.env.VITE_API_URL;
interface SidebarSelection {
    onSelect: (selection: string) => void;
}
const Sidebar: React.FC<SidebarSelection> = ({ onSelect }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isFileSelected, setIsFileSelected] = useState(false);
    const [summaryId, setSummaryId] = useState<string>(localStorage.getItem("summaryId") || "");

    function doHandleLogout() {
        window.location.href = '/login';
        localStorage.clear();
        sessionStorage.clear();

    }

    const handleSelect = (selection: string) => {
        onSelect(selection);
        sessionStorage.setItem('sidebarSelection', selection);
    };

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsFileSelected(true);
        }
    };

    const handleFileSelect = () => {
        onSelect("Summary");
        sessionStorage.setItem("sidebarSelection", "Summary");
        //setIsFileSelected(true);
        document.getElementById("fileToUpload")?.click();
    };


    // When submit is clicked content should be displayed on the white part of the screen
    // need backend etc for this portion may need to alter
    const handleSubmitFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append("file", file);
            formData.append("userId", JSON.parse(localStorage.getItem("user_data") || "").id);

            fetch(apiUrl+"/api/process-file", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    localStorage.setItem("summaryId", data.summaryId);
                    localStorage.setItem("summary", data.summary);
                    localStorage.setItem("quiz", data.quiz);
                    localStorage.setItem("summaryName", data.summaryName);
                    localStorage.setItem("summaryDateCreated", data.summaryDateCreated);
                    setIsFileSelected(false);
                }).then(()=>{window.location.reload();})
                .catch((error) => {
                    //setMessage("Error uploading file");
                });
        } else {
            //setMessage("No file selected.");



        };

    };

    return (
        <div className="side-bar">
            <div className="side-bar-header">Summarizer</div>
            <div className="divider"></div>
            <a className="side-bar-links" onClick={() => handleSelect('Account')}>My Acccount</a>

            <div
                className="side-bar-links"
                onClick={handleFileSelect}
                style={{
                    display: "flex",
                    alignItems: "center",
                    cursor: "pointer",
                }}
            >
                Upload
                <FontAwesomeIcon icon={faUpload} size="1x"/>
            </div>

            {/* Show Submit Button in Sidebar if File is Selected, may need to fix later */}
            {isFileSelected && (
                <button
                    onClick={handleSubmitFile}
                    className="side-bar-links"
                    style={{marginLeft: "10px", marginTop: "5px", fontSize: "16px"}}
                >
                    Submit
                </button>
            )}
            <div>
                {/* what the upload the types of files it can handle*/}
                <div className="upload-container">
                    <input
                        type="file"
                        id="fileToUpload"
                        name="fileToUpload"
                        style={{display: "none"}}
                        accept=".pptx, .docx"
                        onChange={handleFileChange}
                    />
                </div>
            </div>
            <a className="side-bar-links" onClick={() => handleSelect('Quiz')}>Quiz</a>
            <a className="side-bar-links" onClick={() => handleSelect('Summary')}>Summary</a>
            <a className="side-bar-links" onClick={doHandleLogout}>Log out</a>
        </div>
    );
}


export default Sidebar;