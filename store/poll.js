import { put, call } from "redux-saga/effects";
import axios from "axios";

import * as actions from "./actions";

function delay(duration) {
    const promise = new Promise(resolve => {
        setTimeout(() => resolve(true), duration)
    })
    return promise
}

export function* poll(action) {
    try {
        let wait = 0;
        while(true) {
            const response = yield axios.get("https://antlogic-backend-services.herokuapp.com/upsign/v1/auth/pair/" + action.pairCode);

            if(response.data.accessToken !== null){
                yield put( actions.pollCallSuccess(response.data.accessToken) );
                break;
            } else {
                wait++;
                yield call(delay, 5000);
            }

            if(wait === 100){
                throw "Timeout";
            }

        }
    } catch (error) {
        alert(JSON.stringify(error))
        yield put(actions.pollCallFail(error));
    }
}