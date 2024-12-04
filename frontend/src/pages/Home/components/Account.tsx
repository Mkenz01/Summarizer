import React, { useState } from 'react';
import './account.css';
import './sidebar.css';

function Account() {
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
                    <div className="text-fields">
                        <div className="text-information">First Name:</div>
                    </div>
                    <div className="text-fields">
                        <div className="text-information">Last Name:</div>
                    </div>
                    <div className="text-fields">
                        <div className="text-information">Username:</div>
                    </div>
                </div>

                <div className="box-container">
                    <h3 className="box-headers">Quiz Statistics</h3>
                    <div className="text-fields2">
                        <div className="text-information">Number of quizzes taken:  17</div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">Number of questions answered:  109</div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">Number of questions right: 56</div>
                    </div>
                    <div className="text-fields2">
                        <div className="text-information">Number of questions wrong:  25</div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Account;