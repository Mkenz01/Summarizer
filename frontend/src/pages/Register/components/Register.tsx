import React, { useState } from 'react';
const apiUrl = import.meta.env.VITE_API_URL;

function Register() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');
    const [fullName, setFullName] = React.useState('');

    return (
        /*<div id="loginDiv">
            <span id="inner-title">PLEASE LOG IN</span><br />
            <input type="text" id="loginName" placeholder="Username"
                onChange={handleSetLoginName} />
            <input type="password" id="loginPassword" placeholder="Password"
                onChange={handleSetPassword} />
            <input type="submit" id="loginButton" className="buttons" value="Do It"
                onClick={doLogin} />
            <span id="loginResult">{message}</span>
        </div>*/

        <div className="signup-body">

        <div className="signup-container">
            <h2>Create an Account</h2>
            <form id="signup-form" action="/signup" method="POST">
                {/*<!-- Full Name Field */}
                <div className="form-group">
                    <label htmlFor="fullName" style={{color: "white"}}>Full Name</label>
                    <input type="text" id="fullName" required placeholder="Enter your full name"
                           onChange={handleSetFullName}/>
                </div>
                {/* Email Field */}


                {/* Username Field */}
                <div className="form-group">
                    <label htmlFor="loginName" style={{color: "white"}}>Username</label>
                    <input type="text" id="loginName" required placeholder="Choose a username"
                           onChange={handleSetLoginName}/>
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label htmlFor="password" style={{color: "white"}}>Password</label>
                    <input type="password" id="password" required placeholder="Enter a password"
                           onChange={handleSetPassword}/>
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                    <label htmlFor="confirm-password" style={{color: "white"}}>Confirm Password</label>
                    <input type="password" id="confirm-password" required placeholder="Re-enter your password"
                           onChange={handleSetPassword}/>
                </div>
                <div className="feedback" id="feedback">
                    Passwords do not match
                </div>

                {/*} Submit Button */}
                <button type="submit" className="submit-button" onClick={doSignUp}>Sign Up</button>

                {/* Redirect to Login Page */}
                <p>Already have an account? <a href="/Login" style={{color: "white"}}>Log in</a></p>
            </form>
        </div>

        </div>

    );

    function handleSetLoginName(e: any): void {
        setLoginName(e.target.value);
    }

    function handleSetPassword(e: any): void {
        let password = document.getElementById('password') as HTMLInputElement;
        let confirmPassword = document.getElementById('confirm-password') as HTMLInputElement;
        let feedback = document.getElementById('feedback')!;

        if (password.value === confirmPassword.value) {
            setPassword(e.target.value);
            feedback.style.display = 'none';
        }
        else{
            feedback.style.display = 'block';
        }

    }

    function handleSetFullName(e: any): void{
        setFullName(e.target.value);
    }

    async function doSignUp(event: any): Promise<void> {
        event.preventDefault();
        var obj = {fullName: fullName, login: loginName, password: loginPassword };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(apiUrl+"/api/signup",
                {
                    method: 'POST', body: js, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
            var res = JSON.parse(await response.text());
            console.log(res)
            if(res.error == "")
                window.location.href = '/';
        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };
};



export default Register;
