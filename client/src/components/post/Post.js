import React, {Fragment, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {getPost} from '../../actions/index';
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Spinner from "../layout/Spinner";
import PostItem from "../posts/PostItem";

const Post = ({getPost, postReducers: {post, loading}, match}) => {
    useEffect(() => {
        getPost(match.params.id);
    }, [getPost, match.params.id]);

    return loading || post === null ? (
        <Spinner/>
    ) : (
        <Fragment>
            <Link to="/posts" className="btn">
                Back To Posts
            </Link>
            <PostItem post={post} showActions={false}/>
            <CommentForm postId={post._id}/>
            <div className="comments">
                {post.comments.map((comment) => (
                    <CommentItem key={comment._id} comment={comment} postId={post._id}/>
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
        getPost: (id) => {
            dispatch(getPost(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post);