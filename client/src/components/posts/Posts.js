import React, {Fragment, useEffect} from 'react';
import {connect} from 'react-redux'
import {getPosts} from '../../actions/index';
import PostItem from "./PostItem";
import PostForm from "./PostForm";
const Posts = ({getPosts, postReducers: {posts}}) => {
    useEffect(() => {
        getPosts();
    }, [getPosts]);

    return (
        <Fragment>
            <h1 className="large text-primary">Posts</h1>
            <p className="lead">
                <i className="fas fa-user" /> Welcome to the community
            </p>
            <PostForm />
            <div className="posts">
                {posts.map((post) => (
                    <PostItem key={post._id} post={post} />
                ))}
            </div>
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
        getPosts: () => {
            dispatch(getPosts())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts);