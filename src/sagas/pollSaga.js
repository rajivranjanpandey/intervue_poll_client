import { takeLatest, call, put } from 'redux-saga/effects';
import { getActivePollApi } from '../api/poll.api';
import { fetchActivePollFailure, fetchActivePollRequest, fetchActivePollSuccess } from '../reducers/pollReducer';

function* getPoll({ payload }) {
    try {
        console.log('get poll called')
        const data = yield getActivePollApi(payload);
        if (data)
            yield put(fetchActivePollSuccess(data));
    } catch (error) {
        console.error('Error in fetching active poll data', error);
        fetchActivePollFailure();
    }
}

export default function* pollSaga() {
    yield takeLatest(fetchActivePollRequest.type, getPoll);
}
