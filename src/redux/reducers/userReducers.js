import {SET_UNAUTHENTICATED, SET_AUTHENTICATED, LOADING_USER, SET_USER, POSTING, POSTED, LOADING_POST, LOADED_POST, LOAD_JOBS, JOBS_LOADED} from '../types';

const initialState = {
    authenticated: false,
    data: {},
    message: {},
    jobs: [],
    loading: false,
    postLoading: false
};

export default function (state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return{
                ...state,
                loading: true,
                authenticated: true
            };
        case SET_UNAUTHENTICATED:
            return{
                ...state,
                authenticated: false
            }
        case LOADING_USER:
            return{
                ...state,
                loading: true
            }
        case SET_USER:
            return{
                ...state,
                loading: false,
                ...action.payload
            }
        case POSTING:
            return{
                ...state,
                postLoading: true
            }
        case POSTED:
            return{
                ...state,
                postLoading: false,
                loading: false
            }
        case LOADING_POST:
            return{
                ...state,
                loading: true
            }
        case LOADED_POST:
            return{
                ...state,
                loading: false,
                ...action.payload
            }
        case LOAD_JOBS:
            return{
                ...state,
                loading: true
            }
        case JOBS_LOADED:
            return{
                ...state,
                loading: false,
                ...action.payload
            }
            default: 
            return state;
    }
}