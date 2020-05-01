import * as types from "../constants/ActionTypes";


const initialState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
};
export default (state = initialState, action) => {
    const {type, payload} = action;
    switch (type) {
        case types.GET_POSTS:
            return {
                ...state,
                posts: payload,
                loading: false
            };
        case types.POST_ERROR:
            return {
                ...state,
                error: payload,
                loading: false
            };
        case types.UPDATE_LIKES:
            return {
                ...state,
                posts: state.posts.map(post =>
                    post._id === payload.id ? {...post, likes: payload.likes} : post
                ),
                loading: false
            };
        default:
            return state;
    }
}