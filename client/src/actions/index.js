import * as types from "../constants/ActionTypes";
import {v4 as uuidv4} from 'uuid';
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
// =================== AUTH =================================//
export const setAlert = (msg, alertType) => dispatch => {
    const id = uuidv4();
    dispatch({
        type: types.SET_ALERT,
        payload: {msg, alertType, id}
    });
    setTimeout(() => dispatch({type: types.REMOVE_ALERT, payload: id}), 5000);
};

export const register = sendDataRegister => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(sendDataRegister);
        try {
            const res = await axios.post("/api/users", body, config);
            const data = await res.data;
            dispatch({
                type: types.REGISTER_SUCCESS,
                payload: data
            })
        } catch (e) {
            const errors = e.response.data.errors;
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
            dispatch({
                type: types.REGISTER_FAIL
            })
        }
    }
}
export const loadUser = () => {
    return async dispatch => {
        if (localStorage.token) {
            setAuthToken(localStorage.token)
        }
        try {
            const res = await axios.get('/api/auth');
            const data = await res.data;
            dispatch({
                type: types.USER_LOADED,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.AUTH_ERROR
            })
        }
    }
}
export const login = sendDataLogin => {
    return async dispatch => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const body = JSON.stringify(sendDataLogin);
        try {
            const res = await axios.post("/api/auth", body, config);
            const data = await res.data;
            dispatch({
                type: types.LOGIN_SUCCESS,
                payload: data
            })
            dispatch(loadUser());
        } catch (e) {
            const errors = e.response.data.errors;
            if (errors) {
                errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))
            }
            dispatch({
                type: types.LOGIN_FAIL
            })
        }
    }
}
//Logout and clear profile
export const logout = () => {
    return dispatch => {
        dispatch({
            type: types.LOGOUT
        });
        dispatch({
            type: types.CLEAR_PROFILE
        })
    }
}

// =================== PROFILE ======================================= //
// Get currents user profile
export const getCurrentProfile = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/profile/me");
            const data = await res.data;
            dispatch({
                type: types.GET_PROFILE,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
}

//Get all profiles
export const getAllProfiles = () => {
    return async dispatch => {
        dispatch({type: types.CLEAR_PROFILE});
        try {
            const res = await axios.get("/api/profile");
            const data = await res.data;
            dispatch({
                type: types.GET_PROFILES,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            })
        }
    }
}
// Get profile by ID
export const getProfileById = userId => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/user/${userId}`);
        const data = await res.data;
        dispatch({
            type: types.GET_PROFILE,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: types.PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Get Github repos
export const getGithubRepos = username => async dispatch => {
    try {
        const res = await axios.get(`/api/profile/github/${username}`);
        const data = await res.data;

        dispatch({
            type: types.GET_REPOS,
            payload: data
        });
    } catch (err) {
        dispatch({
            type: types.NO_REPOS
        });
    }
};


// Create or update profile
export const createProfile = (
    formData,
    history,
    edit = false
) => async dispatch => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const res = await axios.post('/api/profile', formData, config);

        const data = await res.data

        dispatch({
            type: types.GET_PROFILE,
            payload: data
        });

        dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

        if (!edit) {
            history.push('/dashboard');
        }
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
        }

        dispatch({
            type: types.PROFILE_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Add Experience
export const addExperience = (formData, history) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.put('/api/profile/experience', formData, config);

            const data = await res.data

            dispatch({
                type: types.UPDATE_PROFILE,
                payload: data
            });

            dispatch(setAlert('Experience Added', 'success'));
            history.push('/dashboard');

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}

// Add Education
export const addEducation = (formData, history) => {
    return async dispatch => {
        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            const res = await axios.put('/api/profile/education', formData, config);

            const data = await res.data

            dispatch({
                type: types.UPDATE_PROFILE,
                payload: data
            });

            dispatch(setAlert('Education Added', 'success'));
            history.push('/dashboard');

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
            }

            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: err.response.statusText, status: err.response.status}
            });
        }
    }
}

// Delete experience
export const deleteExperience = id => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/profile/experience/${id}`);
            const data = await res.data;
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: data
            })
            dispatch(setAlert('Experience Removed', 'success'));
        } catch (e) {
            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            });
        }
    }
}

// Delete education
export const deleteEducation = id => {
    return async dispatch => {
        try {
            const res = await axios.delete(`/api/profile/education/${id}`);
            const data = await res.data;
            dispatch({
                type: types.UPDATE_PROFILE,
                payload: data
            })
            dispatch(setAlert('Education Removed', 'success'));
        } catch (e) {
            dispatch({
                type: types.PROFILE_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            });
        }
    }
}
// Delete account & profile
export const deleteAccount = () => {
    return async dispatch => {
        if (window.confirm('Are you sure? This can NOT be undone!')) {
            try {
                await axios.delete('/api/profile');

                dispatch({type: types.CLEAR_PROFILE});
                dispatch({type: types.DELETE_ACCOUNT});

                dispatch(setAlert('Your account has been permanently deleted'));
            } catch (err) {
                dispatch({
                    type: types.PROFILE_ERROR,
                    payload: {msg: err.response.statusText, status: err.response.status}
                });
            }
        }
    }
};

// ========================= POSTS ========================================//
export const getPosts = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/api/posts");
            const data = await res.data;
            dispatch({
                type: types.GET_POSTS,
                payload: data
            })
        } catch (e) {
            dispatch({
                type: types.POST_ERROR,
                payload: {msg: e.response.statusText, status: e.response.status}
            });
        }

    }
}
// Add like
export const addLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/likes/${id}`);
        const data = await res.data
        dispatch({
            type: types.UPDATE_LIKES,
            payload: {id, likes: data}
        });
    } catch (err) {
        dispatch({
            type: types.POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};

// Remove like
export const removeLike = id => async dispatch => {
    try {
        const res = await axios.put(`/api/posts/unlikes/${id}`);
        const data = await res.data;
        dispatch({
            type: types.UPDATE_LIKES,
            payload: {id, likes: data}
        });
    } catch (err) {
        dispatch({
            type: types.POST_ERROR,
            payload: {msg: err.response.statusText, status: err.response.status}
        });
    }
};
