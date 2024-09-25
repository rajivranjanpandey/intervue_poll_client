import { takeLatest, call, put } from 'redux-saga/effects';
import { fetchStudentFailure, fetchStudentRequest, fetchStudentSuccess } from '../reducers/studentReducer';
import { getStudentsApi } from '../api/student.api';

function* getStudent({ payload }) {
    try {
        console.log('get poll called')
        const data = yield getStudentsApi(payload);
        if (data)
            yield put(fetchStudentSuccess(data));
    } catch (error) {
        console.error('Error in fetching student data', error);
        fetchStudentFailure();
    }
}

export default function* studentSaga() {
    yield takeLatest(fetchStudentRequest.type, getStudent);
}
