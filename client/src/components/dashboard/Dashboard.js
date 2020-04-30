import React, {useEffect, Fragment} from "react";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/index";
import {Link} from "react-router-dom";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
const Dashboard = ({getCurrentProfile, authReducers: {user}, profileReducers: {profile}}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return (
        <Fragment>
            <h1 className="large text-primary">Dashboard</h1>
            <p className="lead">
                <i className="fas fa-user"/> Welcome {user && user.name}
            </p>
            {profile !== null ? (
                <Fragment>
                    <DashboardActions/>
                    <Experience experience={profile.experience}/>
                    {/*<Education education={profile.education}/>*/}

                    {/*<div className="my-2">*/}
                    {/*    <button className="btn btn-danger" onClick={() => deleteAccount()}>*/}
                    {/*        <i className="fas fa-user-minus"/> Delete My Account*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </Fragment>
            ) : (
                <Fragment>
                    <p>You have not yet setup a profile, please add some info</p>
                    <Link to="/create-profile" className="btn btn-primary my-1">
                        Create Profile
                    </Link>
                </Fragment>
            )}
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
        getCurrentProfile: () => {
            dispatch(getCurrentProfile())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);