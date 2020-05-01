import React, {useEffect, Fragment} from "react";
import {connect} from "react-redux";
import {getProfileById} from "../../actions";
import Spinner from "../layout/Spinner";
import {Link} from "react-router-dom";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";

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
                    <div className="profile-grid my-1">
                        <ProfileTop profile={profile}/>
                        <ProfileAbout profile={profile}/>
                        <div className="profile-exp bg-white p-2">
                            <h2 className="text-primary">Experience</h2>
                            {profile.experience.length > 0 ? (
                                <Fragment>
                                    {profile.experience.map((experience) => (
                                        <ProfileExperience
                                            key={experience._id}
                                            experience={experience}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No experience credentials</h4>
                            )}
                        </div>
                        <div className="profile-edu bg-white p-2">
                            <h2 className="text-primary">Education</h2>
                            {profile.education.length > 0 ? (
                                <Fragment>
                                    {profile.education.map((education) => (
                                        <ProfileEducation
                                            key={education._id}
                                            education={education}
                                        />
                                    ))}
                                </Fragment>
                            ) : (
                                <h4>No education credentials</h4>
                            )}
                        </div>
                    </div>
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