import React, {Fragment, useState} from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {setAlert} from "../../actions/index";

const Register = ({setAlert}) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        password2: "",
    });
    const {name, email, password, password2} = formData;
    const onHandleChange = (e) =>
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    const onSubmit = async (e) => {
        e.preventDefault();
        if (password !== password2) {
            setAlert("Password do not math", "danger");
        } else {
            console.log('sdsadafds');
        }
    };
    return (
        <Fragment>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead">
                <i className="fas fa-user"></i> Create Your Account
            </p>
            <form className="form" onSubmit={onSubmit}>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={name}
                        onChange={onHandleChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="Email Address"
                        value={email}
                        onChange={onHandleChange}
                        name="email"
                    />
                    <small className="form-text">
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                </div>
                <div className="form-group">
                    <input
                        value={password}
                        onChange={onHandleChange}
                        type="password"
                        placeholder="Password"
                        name="password"
                        minLength="6"
                    />
                </div>
                <div className="form-group">
                    <input
                        value={password2}
                        onChange={onHandleChange}
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Register"/>
            </form>
            <p className="my-1">
                Already have an account? <Link to="/login">Sign In</Link>
            </p>
        </Fragment>
    );
};
const mapDispatchToProps = (dispatch, props) => {
    return {
        setAlert: (msg, alertType) => {
            dispatch(setAlert(msg, alertType))
        }
    }
}

export default connect(null, mapDispatchToProps)(Register);
