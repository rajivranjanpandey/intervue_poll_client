import { takeLatest, call, put } from 'redux-saga/effects';
import { getLivePollHistoryApi } from '../api/poll.api';
import { fetchPollHistoryRequest } from '../reducers/pollHIsttoryReducer';
import { fetchLivePollFailure, fetchLivePollSuccess } from '../reducers/livePollReducer';

function* fetchPollHistory({ payload }) {
    try {
        const data = yield getLivePollHistoryApi(payload);
        if (data) {
            yield put(fetchLivePollSuccess(data));
        }
    } catch (error) {
        console.error('Error in fetching active poll data', error);
        fetchLivePollFailure();
    }
}

export default function* pollHistorySaga() {
    yield takeLatest(fetchPollHistoryRequest.type, fetchPollHistory);
}
