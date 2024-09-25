import { takeLatest, put } from 'redux-saga/effects';
import { getLivePollApi } from '../api/poll.api';
import { fetchLivePollFailure, fetchLivePollRequest, fetchLivePollSuccess, } from '../reducers/livePollReducer';
import socket from '../utils/socket';


function* getLivePoll({ payload }) {
    try {
        console.log('get poll called')
        const data = yield getLivePollApi(payload);
        if (data) {
            yield put(fetchLivePollSuccess(data));
        }
    } catch (error) {
        console.error('Error in fetching active poll data', error);
        fetchLivePollFailure();
    }
}

export default function* livePollSaga() {
    yield takeLatest(fetchLivePollRequest.type, getLivePoll);
}
