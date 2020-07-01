import * as actionTypes from './actionTypes';
import { updateObject } from './utility';
import CryptoJS from 'crypto-js';
import {AsyncStorage} from "react-native-web";

const initialState = {
    error: null,
    loading: false,
    loggedIn: "",
    slides: "",
    pairCode: "",
    accessToken: "",
    images: [],
    imageReady: false
};

const Start = ( state, action ) => {
    return updateObject(
        state, {
            error: null,
            loading: true,
            loggedIn: false,
            accessToken: "",
        } );
};

const imageStart = ( state, action ) => {
    return updateObject(
        state, {
            error: null,
            loading: true,
        } );
};

const authSuccess = (state, action) => {
    const isLoggedIn = action.authData.error == null
    AsyncStorage.setItem("loggedIn", isLoggedIn);
    AsyncStorage.setItem("token", CryptoJS.AES.encrypt(action.authData.tokenType + " " + action.authData.accessToken, "noOne Cancrack myKey"));

    return updateObject( state, {
        error: null,
        loading: false,
        loggedIn: isLoggedIn,
    } );
};

const Fail = (state, action) => {
    return updateObject( state, {
        error: JSON.stringify(action.error),
        loading: false,
        loggedIn: false
    });
}

const getSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        pairCode: action.code.pairCode,
    } );
};

const imageSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        images: action.images,
        imageReady: true,
    } );
}

const pollSuccess = (state, action) => {
    return updateObject( state, {
        error: null,
        loading: false,
        loggedIn: true,
        accessToken: action.token
    } );
}

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.AUTH_START: return Start(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return Fail(state, action);
        case actionTypes.GET_START: return Start(state, action);
        case actionTypes.GET_FAIL: return Fail(state, action);
        case actionTypes.GET_SUCCESS: return getSuccess(state, action);
        case actionTypes.POLL_START: return Start(state, action);
        case actionTypes.POLL_FAIL: return Fail(state, action);
        case actionTypes.POLL_SUCCESS: return pollSuccess(state, action);
        case actionTypes.GET_IMAGE_SUCCESS: return imageSuccess(state, action);
        case actionTypes.GET_IMAGE_START: return imageStart(state, action);
        default:
            return state;
    }
};

export default reducer;