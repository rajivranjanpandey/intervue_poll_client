import { combineReducers } from 'redux';
import pollReducer from './pollReducer';  // Example reducer
import livePollReducer from './livePollReducer';
import pollHIsttoryReducer from './pollHIsttoryReducer';

const rootReducer = combineReducers({
    poll: pollReducer,
    livePoll: livePollReducer,
    pollHistory: pollHIsttoryReducer
});

export default rootReducer;
