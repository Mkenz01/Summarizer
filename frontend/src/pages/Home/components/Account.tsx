import React, { useState, useEffect } from 'react';
import './account.css';
import './sidebar.css';
const apiUrl = import.meta.env.VITE_API_URL;

interface userData {
    fName: string,
    userName: string,
    numCorrect: number,
    numQuestions: number,
    numQuizzes: number
}

function Account() {
    // Initialize userData as undefined or use an optional default value
    const [userData, setUserData] = useState<userData | undefined>(undefined);

    const data = {
        userId: JSON.parse(localStorage.getItem('user_data') || "{}").id
    };

    const loadData = () => {
        fetch(apiUrl + "/api/get-user-data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((data) => {
                setUserData(data.userData);
                console.log(userData);

            })
            .catch((error) => {
                //setMessage("Error uploading file");
            });
    };

    useEffect(() => {
        console.log("useEffect running");
        loadData();  // Fetch the data when the component mounts
    }, []);  // Only run on the initial mount

    return (
        <div className="right-container">
            <h1 className="container-heading">My Account</h1>
            <div className="boxes-container">
                <div className="box-container">
                    <h3 className="box-headers">Profile</h3>
                    <div className="circle">
                        <div className="circle1"></div>
                        <div className="circle2"></div>
                        <div className="circle3"></div>
                    </div>

                    {/* Conditionally render the full name and username */}
                    <div className="text-fields">
                        <div className="text-information">
                            Full Name: {userData ? userData.fName : "Loading..."}
                        </div>
                    </div>
                    <div className="text-fields">
                        <div className="text-information">
                            Username: {userData ? userData.userName : "Loading..."}
                        </div>
                    </div>
                </div>

                <div className="box-container">
                    <h3 className="box-headers">Quiz Statistics</h3>
                    {/* Conditionally render quiz statistics */}
                    <div className="text-fields2">
                        <div className="text-information">
                            Number of quizzes taken: {userData ? userData.numQuizzes : "Loading..."}
                        </div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">
                            Number of questions answered: {userData ? userData.numQuestions : "Loading..."}
                        </div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">
                            Number of questions right: {userData ? userData.numCorrect : "Loading..."}
                        </div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">
                            Number of questions wrong: {userData ? userData.numQuestions - userData.numCorrect : "Loading..."}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;