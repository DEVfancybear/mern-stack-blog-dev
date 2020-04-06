import React from "react";

const Login = () => {
    return (
        <div className="container">
            <h2>Login</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <label htmlFor="email">
                            Email
                        </label>
                        <input/>

                        <span className="helper-text" data-error="Type a right type email"/>

                    </div>
                    <div className="row">
                        <label htmlFor="password">
                            Password
                        </label>
                        <input/>
                        <span className="helper-text" data-error="Type a right type password"/>

                    </div>
                </form>
            </div>
            <div className="row">
                <div className="col s12">
                    <button className="btn waves-effect red lighten-2">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login;