import React, { useState } from 'react';
import './account.css'
import './sidebar.css'

function Quiz() {
    return (
        <div className="right-container">
            <h1 className="container-heading">My Account</h1>
            <div className="boxes-container">
                <div className="box-container">
                    <h3>Profile</h3>
                    <div className="circle"></div>
                    <h3 className="headers-in-box">User Name</h3>
                    <div className="text-fields">
                        <div className="text-information">Username:</div>
                    </div>
                    <div className="text-fields">
                        <div className="text-information">E-mail:</div>
                    </div>
                </div>

                <div className="box-container">
                    <h3>Difficulty</h3>
                    <div className="scale-container">
                        <h4>Multiple Choice:</h4>
                        <input type="range" id="scale" name="scale" min="1" max="10" value="5" className="scale"/>
                        <div className="number-container"><span>1</span> <span>2</span> <span>3</span> <span>4</span>
                            <span>5</span> <span>6</span> <span>7</span> <span>8</span> <span>9</span> <span>10</span>
                        </div>
                        <div className="scale-value">
                            <span id="scale-value">5</span>
                        </div>
                        <h4>Free Response:</h4>
                        <input type="range" id="scale" name="scale" min="1" max="10" value="5" className="scale"/>
                        <div className="number-container"><span>1</span> <span>2</span> <span>3</span> <span>4</span>
                            <span>5</span> <span>6</span> <span>7</span> <span>8</span> <span>9</span> <span>10</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
);
}

export default Quiz;