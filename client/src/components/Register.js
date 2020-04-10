import React, {useState} from "react";
import {connect} from "react-redux";
import {registerUser} from "../actions/index";
import { withRouter } from 'react-router';
import {compose} from "redux";

const Register = ({registerUser, history}) => {
    const [state, setState] = useState({
        email: "",
        password: "",
        lastname: "",
        name: "",
        errors: []
    });
    const {email, password, name, lastname, errors} = state;
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
            password,
            name,
            lastname
        };
        if (isFormValid(state)) {
            setState({
                ...state,
                errors: []
            });
            // push data user register
            registerUser(dataToSubmit);
            console.log(dataToSubmit)
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
    const isFormValid = ({email, password, name, lastname}) => email && password && name && lastname;
    // const displayErrors = errors => errors.map((error, index) => <p key={index}>{error}</p>

    return (
        <div className="container">
            <h2>Register Account</h2>
            <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="name" value={name} id="name" onChange={onHandleChange}
                                   className="validate"/>
                            <label htmlFor="name">
                                Name
                            </label>

                            <span className="helper-text" data-success="right" data-error="Type a right type name"/>
                        </div>

                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <input name="lastname" value={lastname} id="lastname" onChange={onHandleChange}
                                   className="validate"/>
                            <label htmlFor="lastname">
                                Lastname
                            </label>

                            <span className="helper-text" data-success="right" data-error="Type a right type lastname"/>
                        </div>

                    </div>
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
                        Register
                    </button>
                </div>
            </div>
        </div>
    )
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        registerUser: dataSubmit => {
            dispatch(registerUser(dataSubmit))
        }
    }
}

const RegisterRouter = compose(withRouter,connect(null, mapDispatchToProps) )

export default RegisterRouter(Register);