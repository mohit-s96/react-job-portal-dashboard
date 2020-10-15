import {SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_SEARCH_ERRORS, CLEAR_SEARCH_ERRORS} from '../types';

const initialState = {
    loading: false,
    errors: null,
    publicErrors: false
}
export default function (state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return{
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS:
            return{
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return{
                ...state,
                loading: true
            }
        case SET_SEARCH_ERRORS:
            return{
                ...state,
                publicErrors: true
            }
        case CLEAR_SEARCH_ERRORS: 
            return{
                ...state,
                publicErrors: false
            }
        default:
            return state;
    }
}