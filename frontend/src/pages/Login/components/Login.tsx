import React, { useState } from 'react';

function Login() {
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

        <div className = "wrapper">
            <form action="">
                <h2>Login</h2>
                <div className="input-box">
                    <input type="text" id={"loginName"} placeholder="Username" required
                           onChange={handleSetLoginName}/>
                        <i className="bx bx-user"></i>
                </div>
                <div className="input-box">
                    <input type="password" id="loginPassword" placeholder="Password" required
                           onChange={handleSetPassword}/>
                    <i className="bx bx-lock"></i>
                </div>

                <input type="submit" id="loginButton" className="btn" value="Login"
                       onClick={doLogin}/>


                <div className="register-link">
                    <p>Don't have an account?
                        <a href="/register"> Register Here</a>
                    </p>
                </div>
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
            const response = await fetch('https://3.238.62.241:5000/api/login',
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
                    { fullName: res.fullName, id: res.id }
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/home';
            }
        }
        catch (error: any) {
            alert(error.toString());
            return;
        }
    };
};



export default Login;
