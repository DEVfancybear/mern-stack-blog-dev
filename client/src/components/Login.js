import React, {useState} from "react";
import {connect} from "react-redux";
import {loginUser} from "../actions/index";
import { withRouter } from 'react-router';
import {compose} from "redux";

const Login = ({user_reducer: {user}, loginUser, history}) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        errors: []
    });
    const {email, password, errors} = state;
    const onHandleChange = e => {
        const target = e.target;
        const name = target.name;
        const value = target.value;
        setState({
            ...state,
            [name]: value
        })
    }
    const onSubmitForm = e => {
        e.preventDefault();
        const dataToSubmit = {
            email,
            password
        };
        if (isFormValid(state)) {
            setState({
                ...state,
                errors: []
            });
            // push data user login
            loginUser(dataToSubmit);
            history.push("/");

        } else {
            setState({
                ...state,
                errors: errors.concat('Form is not valid')
            })
        }

    }
    // const {email} = state;
    // const email = state.email;
    const isFormValid = ({email, password}) => email && password;
    // const displayErrors = errors => errors.map((error, index) => <p key={index}>{error}</p>
    if (user === false) {
        return "Failed"
    }
    return (
        <div className="container">
            <h2>Login</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="email" value={email} id="email" type="email" onChange={onHandleChange}
                                   className="validate"/>
                            <label htmlFor="email">
                                Email
                            </label>

                            <span className="helper-text" data-success="right" data-error="Type a right type email"/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="password" value={password} id="password" type="password"
                                   onChange={onHandleChange} className="validate"/>
                            <label htmlFor="password">
                                Password
                            </label>
                            <span className="helper-text" data-error="wrong" data-success="right"/>
                        </div>

                    </div>
                </form>
            </div>

            {/*check validate form*/}
            {/*{errors.length && (<div>*/}
            {/*    {displayErrors(errors)}*/}
            {/*</div>)}*/}
            <div className="row">
                <div className="col s12">
                    <button type="submit" name="action" onClick={onSubmitForm}
                            className="btn waves-effect red lighten-2">
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
}
const mapStateToProps = state => {
    return {
        user_reducer: state.user_reducer
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        loginUser: dataSubmit => {
            dispatch(loginUser(dataSubmit))
        }
    }
}
const LoginRouter = compose(withRouter, connect(mapStateToProps, mapDispatchToProps));
export default LoginRouter(Login);