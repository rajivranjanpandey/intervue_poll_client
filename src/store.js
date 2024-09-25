import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';  // Combine all reducers here
import rootSaga from './sagas';        // Combine all sagas here

// Create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// Configure the store with saga middleware
const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Disable thunk and add saga
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in non-production mode
});

// Run the root saga
sagaMiddleware.run(rootSaga);

export default store;
