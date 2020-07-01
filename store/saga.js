import { takeEvery } from "redux-saga/effects";

import * as actionTypes from "./actionTypes";
import {poll} from "./poll";

export function* watchAuth() {
    yield takeEvery(actionTypes.POLL_START, poll);
}