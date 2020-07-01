import * as actionTypes from './actionTypes'
import axios from 'axios'

export const getStart = () => {
    return {
        type: actionTypes.GET_START,
    }
};

export const getImageStart = () => {
    return {
        type: actionTypes.GET_IMAGE_START,
    }
};

export const getFail = (err) => {
    return {
        type: actionTypes.GET_FAIL,
        error: err,
    }
};

export const getCodeSuccess = (code) => {
    console.log(code);
    return {
        type: actionTypes.GET_SUCCESS,
        code: code.data,
    }
};

export const generateCode = (config) => {
    return dispatch => {
        dispatch(getStart());
        const url = "https://antlogic-backend-services.herokuapp.com/upsign/v1/auth/pair";

        axios.post(
            url,config)
            .then(response => {
                dispatch(getCodeSuccess(response))
            })
            .catch(err => {
                console.log(err)
                dispatch(getFail(err))
            })
    }
};

export const poll = (pairCode) => {
    return {
        type: actionTypes.POLL_START,
        pairCode: pairCode
    }
};

export const pollCallSuccess = (action) => {
    return {
        type: actionTypes.POLL_SUCCESS,
        token: action
    }
};

export const pollCallFail = (error) => {
    return {
        type: actionTypes.POLL_FAIL,
        error: error
    }
};

export const getImages = (headers) => {
    return dispatch => {
        dispatch(getImageStart());
        const url = "https://antlogic-backend-services.herokuapp.com/upsign/v1/images";

        console.log("Here's my headers");
        console.log(JSON.stringify(headers));

        axios.get(url, headers)
            .then(response => {
                console.log("Zain's a cock sucker")
                dispatch(getImageSuccess(response))
            })
            .catch(err => {
                console.log(JSON.stringify(err))
                dispatch(getFail(err))
            })
    }
};

export const getImageSuccess = (code) => {
    return {
        type: actionTypes.GET_IMAGE_SUCCESS,
        images: code.data.images,
    }
};

export const locationCallStart = () => {
    return {
        type: actionTypes.LOCATION_CALL_START
    };
};

export const locationCallSuccess = (locations) => {
    return {
        type: actionTypes.LOCATION_CALL_SUCCESS,
        locationList: locations
    };
};

export const locationCallFail = error => {
    return {
        type: actionTypes.LOCATION_CALL_FAIL,
        error: error
    };
};