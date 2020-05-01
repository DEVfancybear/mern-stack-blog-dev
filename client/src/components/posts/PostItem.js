import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';


const PostItem = ({
                      authReducers,
                      post: { _id, text, name, avatar, user, likes, comments, date },
                  }) => (
    <div className='post bg-white p-1 my-1'>
        <div>
            <Link to={`/profile/${user}`}>
                <img className='round-img' src={avatar} alt='' />
                <h4>{name}</h4>
            </Link>
        </div>
        <div>
            <p className='my-1'>{text}</p>
            <p className='post-date'>
                Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
            </p>
        </div>
    </div>
);



const mapStateToProps = state => {
    return {
        authReducers: state.authReducers
    }
}

export default connect(
    mapStateToProps,
   null
)(PostItem);