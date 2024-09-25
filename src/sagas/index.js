import { all } from 'redux-saga/effects';
import pollSaga from './pollSaga';  // Example saga
import livePollSaga from './livePollSaga';
import pollHistorySaga from './pollHistorySaga';

export default function* rootSaga() {
    yield all([
        pollSaga(),
        livePollSaga(),
        pollHistorySaga()
    ]);
}
