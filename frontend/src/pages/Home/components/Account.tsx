import React, { useState, useEffect } from 'react';
import './account.css';
import './sidebar.css';
import {json} from "express";
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
    const [userName, setUserName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [fName, setFName] = React.useState('');

    function handleSetUserName(e: any): void {
        setUserName(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }
    function handleSetFname(e: any): void {
        setFName(e.target.value);
    }

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

    const doSubmitChanges = () =>{

        let formData = {
            userId: JSON.parse(localStorage.getItem('user_data') || "{}").id,
            password: password,
            fName: fName,
            userName: userName
        }
        console.log(formData)

        fetch(apiUrl + "/api/change-user-data", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData),
        })
            .then((response) => response.json())
            .then(() => {
                window.location.reload();
            })
            .catch((error) => {
                //setMessage("Error uploading file");
            });
    };

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
                            Full Name: <input className="password-input" onChange={handleSetFname}  id="fName" placeholder={userData?.fName}/>
                        </div>
                    </div>
                    <div className="text-fields">
                        <div className="text-information">
                            Username: <input className="password-input"  id="userName" onChange={handleSetUserName} placeholder={userData?.userName}/>
                        </div>
                    </div>
                    <div className="password-fields">
                        <div className="text-information">
                            Password: <input className="password-input" type="password" id="loginPassword" onChange={handleSetPassword} placeholder="Enter password to confirm changes"/>
                        </div>
                    </div>
                    <button className="button" onClick={doSubmitChanges}>Submit</button>
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