import React, {useEffect} from "react";
import {connect} from "react-redux";
import {getCurrentProfile} from "../../actions/index";

const Dashboard = ({getCurrentProfile}) => {
    useEffect(() => {
        getCurrentProfile();
    }, [getCurrentProfile]);
    return (
        <div>Dashboard</div>
    )
}
const mapStateToProps = state => {
    return {
        profileReducers: state.profileReducers
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