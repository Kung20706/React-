import { createStore, combineReducers, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import updateToken from "../reducers/updateToken";

const store = createStore(
    combineReducers({
        updateToken,
    }),
    {},
    applyMiddleware(logger)
);
export default store