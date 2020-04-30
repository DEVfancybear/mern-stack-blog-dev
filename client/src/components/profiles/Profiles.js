import React, {useEffect, Fragment} from "react";
import {connect} from "react-redux";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";
import {getAllProfiles} from "../../actions";

const Profiles = ({getAllProfiles, profileReducers: {profiles, loading}}) => {
    useEffect(() => {
        getAllProfiles();
    }, [getAllProfiles])
    return (
        <Fragment>
            {loading ? <Spinner/> :
                <Fragment>
                    <h1 className="large text-primary">Developers</h1>
                    <p className="lead">
                        <i className="fab fa-connectdevelop"> </i> Browse and connect with developers
                    </p>
                    <div className="profiles">
                        {profiles.length > 0 ? (profiles.map((profile, index) => (
                            <ProfileItem key={index} profile={profile}/>
                        ))) : <h4>No profiles found ...</h4>}
                    </div>

                </Fragment>}

        </Fragment>
    )
}

const mapStateToProps = state => {
    return {
        profileReducers: state.profileReducers
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getAllProfiles: () => {
            dispatch(getAllProfiles())
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Profiles);