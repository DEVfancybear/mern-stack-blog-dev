import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPost} from '../actions/index';
import Spinner from "../components/layout/Spinner";
import PostItem from "../components/posts/PostItem";

const Post = ({ getPost, postReducers: { post, loading }, match }) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false} />
        </Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        postReducers: state.postReducers
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getPost: (id) => {
            dispatch(getPost(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);