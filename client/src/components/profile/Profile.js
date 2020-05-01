import React, {useEffect, Fragment} from "react";
import {connect} from "react-redux";
import {getProfileById} from "../../actions";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import authReducers from "../../reducers/authReducers";

const Profile = ({getProfileById, profileReducers: {profile, loading}, authReducers, match}) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById])
    return (
        <Fragment>
            {profile === null || loading ? <Spinner/> :
                <Fragment>
                    <Link to="/profiles" className="btn btn-light">Back to Profiles</Link>
                    {authReducers.isAuthenticated && authReducers.loading === false && authReducers.user._id === profile.user._id && (
                        <Link to="/edit-profile" className="btn btn-dark">Edit Profile</Link>)}
                </Fragment>}
        </Fragment>
    )
}
const mapStateToProps = state => {
    return {
        profileReducers: state.profileReducers,
        authReducers: state.authReducers
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        getProfileById: userId => {
            dispatch(getProfileById(userId))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);