import { combineReducers } from 'redux';
import pollReducer from './pollReducer';  // Example reducer
import livePollReducer from './livePollReducer';
import pollHIsttoryReducer from './pollHIsttoryReducer';
import studentReducer from './studentReducer';

const rootReducer = combineReducers({
    poll: pollReducer,
    livePoll: livePollReducer,
    pollHistory: pollHIsttoryReducer,
    students: studentReducer
});

export default rootReducer;
