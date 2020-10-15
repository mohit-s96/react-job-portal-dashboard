import {LOADING_UI, SET_ERRORS, CLEAR_ERRORS, SET_UNAUTHENTICATED,
        LOADING_USER, SET_USER, POSTING, POSTED, LOADED_POST,
        LOADING_POST, LOAD_JOBS, JOBS_LOADED, SET_SEARCH_ERRORS, CLEAR_SEARCH_ERRORS} from '../types';
import axios from 'axios';


export const loginUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post('your_public_endpoint/login', userData)
             .then(res => {
                localStorage.setItem('jwt-auth', res.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                dispatch(getUserData());
                dispatch({type: CLEAR_ERRORS});
                history.push('/home');
             })
             .catch(err => {
               dispatch({
                   type: SET_ERRORS,
                   payload: (err.response.data.errors) ? err.response.data.errors : err.response.data
               });
             });
}

export const logoutUser = () => dispatch => {
    localStorage.clear();
    delete axios.defaults.headers.common['Authorization'];
    window.location.href = '/';
    dispatch({type: SET_UNAUTHENTICATED});
}

export const signupUser = (userData, history) => dispatch => {
    dispatch({type: LOADING_UI});
    axios.post('your_public_endpoint/signup', userData)
             .then(res => {
                localStorage.setItem('jwt-auth', res.data.token);
                axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.token}`;
                dispatch(getUserData());
                dispatch({type: CLEAR_ERRORS});
                history.push('/home');
             })
             .catch(err => {
               dispatch({
                   type: SET_ERRORS,
                   payload: (err.response.data.errors) ? err.response.data.errors : err.response.data
               });
             });
}

export const getUserData = () => dispatch => {
    dispatch({type: LOADING_USER});
    axios.get('your_public_endpoint/postauth')
         .then(res => {
             dispatch({
                 type: SET_USER,
                 payload: res.data
             });
         })
         .catch(err => console.log(err));   
}

export const postOneJob = body => dispatch => {
    dispatch({type: POSTING});
    dispatch({type: LOADING_USER});
    axios.post('your_public_endpoint/postjob', body)
         .then(() => {
            dispatch({type: POSTED});
            dispatch(getUserData());
         })
         .catch(err => {
             console.log(err);
         })

}

export const getOnePost = id => dispatch => {
    dispatch({type: LOADING_POST});
    const body ={postId: id}
    axios.post('your_public_endpoint/getone', body)
         .then(res => {
             dispatch({
                 type: LOADED_POST,
                 payload: res.data
             });
         })
         .catch(err => console.log(err));
}

export const updatePost = body => dispatch => {
    dispatch({type: POSTING});
    dispatch({type: LOADING_USER});
    axios.post('your_public_endpoint/updatepost', body)
    .then(() => {
        dispatch({type: POSTED});
        dispatch(getUserData());
    })
    .catch(err => {
        console.log(err);
    })
}

export const searchJobs = job => dispatch => {
    dispatch({type: LOAD_JOBS});
    axios.post('your_public_endpoint/getjob', {job: job})
         .then(res => {
            if(res.data.jobs.length > 0){
                dispatch({type: CLEAR_SEARCH_ERRORS})
                dispatch({
                    type: JOBS_LOADED,
                    payload: res.data
                });
            }
            else{
                dispatch({type: SET_SEARCH_ERRORS});
                dispatch({
                    type: JOBS_LOADED,
                    payload: []
                })
            }
         })
         .catch(err => console.log(err));
}