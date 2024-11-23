import React, { useState } from 'react';

function Register() {
    const [message, setMessage] = React.useState('');
    const [loginName, setLoginName] = React.useState('');
    const [loginPassword, setPassword] = React.useState('');

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

        <div className="signup-container">
            <h2>Create an Account</h2>
            <form id="signup-form" action="/signup" method="POST">
                {/*<!-- Full Name Field */}
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" id="fullname" name="fullname" required placeholder="Enter your full name"/>
                </div>

                {/* Email Field */}
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" required placeholder="Enter your email"/>
                </div>

                {/* Username Field */}
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username" required placeholder="Choose a username"/>
                </div>

                {/* Password Field */}
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" required placeholder="Enter a password"/>
                </div>

                {/* Confirm Password Field */}
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" id="confirm-password" name="confirm-password" required placeholder="Re-enter your password"/>
                </div>

                {/*} Submit Button */}
                <button type="submit" className="submit-button">Sign Up</button>

                {/* Redirect to Login Page */}
                <p>Already have an account? <a href="/Login">Log in</a></p>
            </form>
        </div>

    );

    function handleSetLoginName(e: any): void {
        setLoginName(e.target.value);
    }

    function handleSetPassword(e: any): void {
        setPassword(e.target.value);
    }

    async function doLogin(event: any): Promise<void> {
        event.preventDefault();
        var obj = { login: loginName, password: loginPassword };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch('http://localhost:5000/api/login',
                {
                    method: 'POST', body: js, headers: {
                        'Content-Type':
                            'application/json'
                    }
                });
            var res = JSON.parse(await response.text());
            console.log(res);
            if (res.id <= 0) {
                setMessage('User/Password combination incorrect');
            }
            else {
                var user =
                    { firstName: res.firstName, lastName: res.lastName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards';
            }
        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };
};



export default Register;
