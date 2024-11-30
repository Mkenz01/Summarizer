import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

interface SidebarSelection {
    onSelect: (selection: string) => void;
}
const Sidebar: React.FC<SidebarSelection> = ({ onSelect }) => {
    const [file, setFile] = useState<File | null>(null);
    const [isFileSelected, setIsFileSelected] = useState(false);

    function doHandleLogout() {
        console.log("logout")
    }

    const handleFileChange = (e: any) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            setFile(selectedFile);
            setIsFileSelected(true);
        }
    };

    const handleFileSelect = () => {
        onSelect("Upload");
        document.getElementById("fileToUpload")?.click();
    };


    // When submit is clicked content should be displayed on the white part of the screen
    // need backend etc for this portion may need to alter
    const handleSubmitFile = () => {
        if (file) {
            const formData = new FormData();
            formData.append("fileToUpload", file);

            fetch("http://localhost:5000/api/upload", {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    //setMessage("File uploaded successfully");
                    setIsFileSelected(false);
                })
                .catch((error) => {
                    //setMessage("Error uploading file");
                });
        } else {
            //setMessage("No file selected.");
        }
    };

    return (
        <div className="side-bar">
            <div className="side-bar-header">Website Name</div>
            <div className="divider"></div>
            <a className="side-bar-links" onClick={() => onSelect('Account')}>My Acccount</a>

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
                <FontAwesomeIcon icon={faUpload} size="1x" />
            </div>

            {/* Show Submit Button in Sidebar if File is Selected, may need to fix later */}
            {isFileSelected && (
                <button
                    onClick={handleSubmitFile}
                    className="side-bar-links"
                    style={{ marginLeft: "10px", marginTop: "5px", fontSize: "16px" }}
                >
                    Submit
                </button>
            )}
                <a className="side-bar-links" onClick={() => onSelect('Quiz')}>Quiz</a>
                <a className="side-bar-links" onClick={() => onSelect('Summary')}>Summary</a>
                <a className="side-bar-links" onClick={doHandleLogout}>Log out</a>
            </div>
            );
            }


            export default Sidebar;