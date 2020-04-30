import React, {Fragment, useState} from "react";
import {Link, Redirect} from "react-router-dom";
import {login} from "../../actions/index";
import {connect} from "react-redux";

const Login = ({login, authReducers: {isAuthenticated}}) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const {email, password} = formData;
    const onHandleChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    const onSubmit = (e) => {
        e.preventDefault();
        const sendDataLogin = {
            email,
            password
        }
        login(sendDataLogin);
    };
    if (isAuthenticated) {
        return <Redirect to="/dashboard"/>
    }
    return (
        <Fragment>
            <h1 className="large text-primary">Sign In</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Sign into Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={onHandleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        value={password}
                        onChange={onHandleChange}
                        placeholder="Password"
                        name="password"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login"/>
            </form>
            <p className="my-1">
                Don't have an account? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        authReducers: state.authReducers
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        login: sendDataLogin => {
            dispatch(login(sendDataLogin))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
